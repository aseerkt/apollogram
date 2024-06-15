import { ApolloServer } from '@apollo/server'
import {
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from '@as-integrations/fastify'
import { RequestContext } from '@mikro-orm/core'
import { fastify } from 'fastify'
import { createLoader } from './dataloaders/index.js'
import { initORM } from './db.js'
import config from './mikro-orm.config.js'
import { createSchema } from './schema.js'
import { MyContext } from './types.js'

const PORT = Number(process.env.PORT || 5000)

async function bootstrap(port = PORT) {
  const db = await initORM(config)

  const schema = await createSchema()

  const app = fastify()

  // register request context hook
  app.addHook('onRequest', (_request, _reply, done) => {
    RequestContext.create(db.em, done)
  })

  // shut down the connection when closing the app
  app.addHook('onClose', async () => {
    await db.orm.close()
  })

  const apollo = new ApolloServer<MyContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(app)],
  })

  await apollo.start()

  app.route({
    url: '/graphql',
    method: ['POST', 'GET', 'OPTIONS'],
    handler: fastifyApolloHandler(apollo, {
      context: async (req) => ({
        req,
        em: db.em.fork(),
        loader: createLoader(db.em.fork()),
      }),
    }),
  })

  const url = await app.listen({ port })

  return { url, app }
}

export default bootstrap
