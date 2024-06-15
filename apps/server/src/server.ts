import 'colors'
import 'dotenv/config'
import 'reflect-metadata'
import bootstrap from './app.js'

try {
  // configureCloudinary()
  const { url } = await bootstrap()

  console.log(`Graph API is running at ${url}/graphql`.blue.bold)
} catch (error) {
  console.log(error)
}
