import { NextRequest } from "next/server";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(req: NextRequest, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
