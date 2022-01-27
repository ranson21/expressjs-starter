/**
 * Health Check Endoint
 * @param {Object} req -- Express Request Object
 * @param {Object} res -- Express Response Object
 */
export const health = (req, res) => {
  res.send("ok");
};
