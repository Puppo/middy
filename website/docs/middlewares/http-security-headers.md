---
title: http-security-headers
---

Applies best practice security headers to responses. It's a simplified port of HelmetJS. See [HelmetJS](https://helmetjs.github.io/) documentation for more details.

## Install

To install this middleware you can use NPM:

```bash npm2yarn
npm install --save @middy/http-security-headers
```

## Features
- `dnsPrefetchControl` controls browser DNS prefetching
- `frameguard` to prevent clickjacking
- `hidePoweredBy` to remove the Server/X-Powered-By header
- `hsts` for HTTP Strict Transport Security
- `ieNoOpen` sets X-Download-Options for IE8+
- `noSniff` to keep clients from sniffing the MIME type
- `referrerPolicy` to hide the Referer header
- `xssFilter` adds some small XSS protections

## Options

There are a lot, see [source](https://github.com/middyjs/middy/blob/main/packages/http-security-headers/index.js#L5)

## Sample usage

```javascript
import middy from '@middy/core'
import httpSecurityHeaders from '@middy/http-security-headers'

const lambdaHandler = (event, context) => {
  return {}
}

export const handler = middy().use(httpSecurityHeaders()).handler(lambdaHandler)
```
