// External Deendencies
import express from "express";
import jwt from "express-jwt";
import cors from "cors";

// Local dependencies

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

  // Set the Port and Host
  const port = process.env.PORT || 4000;
  const host = process.env.HOST || "127.0.0.1";

  // Start the gateway server
  app.listen({ port, host }, () =>
    console.log(`🚀 Server running at ${host}:${port}`)
  );
}

// Start the service unless we are testing
if (process.env.NODE_ENV !== "test") {
  start();
}
