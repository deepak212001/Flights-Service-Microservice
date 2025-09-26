const { StatusCodes } = require("http-status-codes");

const info = (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "API is live",
    error: {},
    data: {},
  });
};

// res.status(5000).json({})
// res.status(500)-> return res so agr use bhi na kare to chalega
module.exports = { info };
