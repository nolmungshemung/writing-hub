/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @see https://github.com/vercel/next.js/tree/canary/examples/with-msw
 */
if (typeof window === 'undefined') {
  const { server } = require('./server');
  server.listen();
} else {
  const { worker } = require('./browser');
  worker.start();
}

export {};
