module.exports = (req, res, next) => {
  // console.log('############### verifying token ###################', req.params);
  // Get auth header value
  const bearerToken = req.params.token;

  // Check if bearer is undefined
  if (typeof bearerToken !== 'undefined') {
    console.log('############### checking token ###################');

    req.token = bearerToken;

    // Next middleware
    next();
  } else {
    console.log('############### forbidden sent ###################');
    // Forbidden
    res.sendStatus(403);
  }
};
