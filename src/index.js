// External Deendencies
import express from "express";
import jwt from "express-jwt";
import cors from "cors";

// Local dependencies
import { getText } from "src/constants";
import { routes } from "src/router";
import { newLogger } from "src/middleware";

/**
 * Start -- Loads the service
 */
export async function start() {
  // Create the Express App
  const app = express();

  // Allow CORS requests
  app.use(cors({ origin: process.env.CORS || "*" }));

  // Attach the JWT verification middleware
  app.use(
    jwt({
      secret: "supersecret",
      algorithms: ["RS256"],
      credentialsRequired: false
    })
  );

  // Attach the logger
  app.use(newLogger());

  // Attach the router
  app.use(routes());

  // Set the Port and Host
  const port = process.env.PORT || 4000;
  const host = process.env.HOST || "127.0.0.1";

  // Start the gateway server
  await app.listen({ port, host });
  console.log(getText("SERVER_STARTUP", { host, port }));
}

// Start the service unless we are testing
if (process.env.NODE_ENV !== "test") {
  start();
}
