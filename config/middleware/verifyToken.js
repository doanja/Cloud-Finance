module.exports = (req, res, next) => {
  // get token from req.params
  const bearerToken = req.params.token;

  // check if bearer is undefined
  if (typeof bearerToken !== 'undefined') {
    req.token = bearerToken;

    // next middleware
    next();
  } else {
    // forbidden
    res.sendFile(path.join(__dirname, '../public/html/401.html'));
  }
};
