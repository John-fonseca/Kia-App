exports.success = (req, res, data, status = 200) => {
  res.status(status).json({
    success: true,
    data
  });
};

exports.error = (req, res, message, status = 500, details = null) => {
  console.error('[response error]', details || message);
  res.status(status).json({
    success: false,
    error: message
  });
};