/* eslint-disable unicorn/import-style */
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node'
import express from 'express'
import { join } from 'node:path'

const browserDistFolder = join(import.meta.dirname, '../browser')
const app = express()
const angularApp = new AngularNodeAppEngine()

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
)

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression, promise/no-callback-in-promise
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    // eslint-disable-next-line promise/no-callback-in-promise
    .catch(next)
})

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const port = process.env['PORT'] || 4000
  app.listen(port, (error) => {
    if (error) {
      // eslint-disable-next-line functional/no-throw-statements
      throw error
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Node Express server listening on http://localhost:${port}`)
  })
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app)
