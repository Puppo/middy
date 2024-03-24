---
title: http-error-handler
---

Automatically handles uncaught errors that contain the properties `statusCode` (number) and `message` (string) and creates a proper HTTP response
for them (using the message and the status code provided by the error object). Additionally, support for the property `expose` is included with a default value of `statusCode < 500`.
We recommend generating these HTTP errors with the npm module [`http-errors`](https://npm.im/http-errors). When manually catching and setting errors with `statusCode >= 500` setting `{expose: true}`
is needed for them to be handled.

This middleware should be set as the last error handler attached, first to execute. When non-http errors (those without `statusCode`) occur they will be returned with a 500 status code.

## Install

To install this middleware you can use NPM:

```bash npm2yarn
npm install --save @middy/http-error-handler
```

## Options

- `logger` (defaults to `console.error`) - a logging function that is invoked with the current error as an argument. You can pass `false` if you don't want the logging to happen.
- `fallbackMessage` (default `undefined`) - When non-http errors (those without `statusCode`) occur you can set a fallback message to be used. These will be returned with a 500 status code.

## Sample usage

```javascript
import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import createError from 'http-errors'

const lambdaHandler = (event, context) => {
  throw new createError.UnprocessableEntity()
}
export const handler = middy().use(httpErrorHandler()).handler(lambdaHandler)

// when Lambda runs the handler...
handler({}, {}, (_, response) => {
  t.deepEqual(response, {
    statusCode: 422,
    body: 'Unprocessable Entity'
  })
})
```
