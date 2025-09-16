export default handelError = (req, res, next) => {
  res.status(500).json({ massage: err.massage });
};
