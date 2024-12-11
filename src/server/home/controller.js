import { config } from '~/src/config/config.js'
import { getTraceId, withTraceId } from '@defra/hapi-tracing'

/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 * @satisfies {Partial<ServerRoute>}
 */
export const homeController = {
  async handler(request, h) {
    request.logger.info(`handling request with trace id of ${getTraceId()}`)

    const dotnetUrl = config.get('dotnetBackend')
    const dotnetRes = await fetch(`${dotnetUrl}/trace`, {
      method: 'GET',
      headers: withTraceId('x-cdp-request-id')
    })
    request.logger.info(
      `Response from dotnet trace request ${dotnetRes.status}`
    )

    const nodeUrl = config.get('nodeBackend')
    const nodeRes = await fetch(`${nodeUrl}/trace`, {
      method: 'GET',
      headers: withTraceId('x-cdp-request-id')
    })
    request.logger.info(`Response from node trace request ${nodeRes.status}`)

    return h.view('home/index', {
      pageTitle: 'Home',
      heading: 'Home'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
