const productValidation = (schema) => (req, res, next) => {
  const { error, value } = schema(req.body, { aboutEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      details: error.details.map((e) => e.message),
    });
  }
  req.body = value;
  next();
};

export default productValidation;
