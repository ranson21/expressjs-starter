import * as mod from "src/index";
import { config as env } from "dotenv";

import { getText } from "src/constants";

// Instantiate Variables
const app = {
  use: jest.fn(),
  listen: jest.fn().mockReturnValue()
};
const jwt = jest.fn();
const cors = jest.fn();
let start;

// Mock Modules
jest.doMock("express-jwt", () => {
  return () => {
    return jwt;
  };
});
jest.doMock("cors", () => {
  return () => {
    return cors;
  };
});
jest.doMock("express", () => {
  return () => {
    return app;
  };
});

describe("Module index", () => {
  beforeEach(() => {
    // Spy On the main function
    start = jest.spyOn(mod, "start");

    // Mock the return values
    jest.spyOn(global.console, "log");
  });

  afterEach(() => {
    jest.restoreAllMocks();

    // Restore the Environment
    env();
  });

  it("Loads required env variables", async () => {
    // Setup the test
    const host = "0.0.0.0";
    const port = 9000;

    // Stub the environment
    process.env.HOST = host;
    process.env.PORT = port;

    // Run the test
    start();

    // Assertions
    expect(app.listen).toHaveBeenCalled();

    // expect(console.log).toHaveBeenCalledWith(
    //   getText("SERVER_STARTUP", { host, port })
    // );
  });

  it("Registers default middleware ", () => {});
});
