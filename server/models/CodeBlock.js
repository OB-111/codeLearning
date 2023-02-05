const mongoose = require("mongoose");

const codeBlockSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    sol: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { collection: "CodeBlocks" }
);

const CodeBlock = mongoose.model("CodeBlocks", codeBlockSchema);
module.exports = CodeBlock;
