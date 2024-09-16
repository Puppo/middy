---
title: ws-router
---

This handler can route to requests to one of a nested handler based on `routeKey` of an WebSocket event from API Gateway (WebSocket).

## Install

To install this middleware you can use NPM:

```bash
npm install --save @middy/ws-router
```

## Options

- `routes` (array[\{routeKey, handler\}]) (required): Array of route objects.
  - `routeKey` (string) (required): AWS formatted route key. ie `$connect`, `$disconnect`, `$default`
  - `handler` (function) (required): Any `handler(event, context, {signal})` function
- `notFoundHandler` (function): Override default 404 error thrown with your own custom response. Passes in `{routeKey}`

NOTES:

- Errors should be handled as part of the router middleware stack **or** the lambdaHandler middleware stack. Handled errors in the later will trigger the `after` middleware stack of the former.
- Shared middlewares, connected to the router middleware stack, can only be run before the lambdaHandler middleware stack.

## Sample usage

```javascript
import middy from '@middy/core'
import wsRouterHandler from '@middy/ws-router'
import wsResponseMiddleware from '@middy/ws-response'
import validatorMiddleware from '@middy/validator'

const connectHandler = middy()
  .use(validatorMiddleware({eventSchema: {...} }))
  .handler((event, context) => {
    return 'connected'
  })

const disconnectHandler = middy()
  .use(validatorMiddleware({eventSchema: {...} }))
  .handler((event, context) => {
    return 'disconnected'
  })

const routes = [
  {
    routeKey: '$connect',
    handler: connectHandler
  },
  {
    routeKey: '$disconnect',
    handler: disconnectHandler
  }
]

export const handler = middy()
  .use(wsResponseMiddleware())
  .handler(wsRouterHandler(routes))
```
