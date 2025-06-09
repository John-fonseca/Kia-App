const express = require("express");
const router = express.Router();
const controller = require("./controller");
const middleware = require("./middleware");

router.post(
  "/register",
  middleware.validateRegister,
  async (req, res, next) => {
    try {
      const result = await controller.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
