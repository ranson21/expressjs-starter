export const getText = (text, options) => {
  const TEXT = {
    SERVER_STARTUP: `🚀 Server running at ${options.host}:${options.port}`
  };

  return TEXT[text];
};
