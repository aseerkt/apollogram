import bootstrap from '../app.js'
import { initORM } from '../db.js'

export async function initTestApp() {
  // this will create all the ORM services and cache them
  const { orm } = await initORM({
    // no need for debug information, it would only pollute the logs
    debug: false,
    // we will use in-memory database, this way we can easily parallelize our tests
    dbName: ':memory:',
    // this will ensure the ORM discovers TS entities, with ts-node, ts-jest and vitest
    // it will be inferred automatically, but we are using vitest here
    // tsNode: true,
  })

  // create the schema so we can use the database
  await orm.schema.createSchema()

  const app = await bootstrap()

  return app
}
