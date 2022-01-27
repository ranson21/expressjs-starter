import { Router } from "express";
import * as controller from "src/controller";

/**
 * Creates instance of Express Router and attaches service routes
 * @returns {Object} -- Express Router Instance
 */
export const routes = () => {
  // Create the Router
  const router = new Router();

  // Attach the routes to the controllers
  router.get("/health", controller.health);

  // Return the constructed router
  return router;
};
