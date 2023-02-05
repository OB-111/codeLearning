const codeBlockController = require("../controllers/codeBlock");

const codeRouter = require("express").Router();

codeRouter.get("/getAll", codeBlockController.findAll);
codeRouter.get("/:id", codeBlockController.getCodeBlock);
codeRouter.put("/:id", codeBlockController.setSelectedCodeBlock);

module.exports = codeRouter;
