const CodeBlock = require("../models/CodeBlock");
const express = require("express");

// Retrieve all CodeBlocks from the database.
const findAll = async (req, res) => {
  try {
    const codeBlock = await CodeBlock.find({});
    res.status(200).json(codeBlock);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Retrieve spesific CodeBlock from the database.
const getCodeBlock = async (req, res) => {
  const codeBlock_id = req.params.id;
  try {
    const codeBlock = await CodeBlock.findOne({ _id: codeBlock_id });
    res.send(codeBlock);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Updating spesific CodeBlock to the database to selcted true and the other to false .
const setSelectedCodeBlock = async (req, res) => {
  const selectedCodeBlockID = req.params.id;
  try {
    const selectedCodeBlock = await CodeBlock.findByIdAndUpdate(
      {
        _id: selectedCodeBlockID,
      },
      {
        isSelected: true,
      },
      { new: true }
    );
    res.status(202).json({ updatedCodeBlock: selectedCodeBlock });
    await CodeBlock.updateMany(
      { _id: { $ne: selectedCodeBlockID } },
      { isSelected: false }
    );
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports.findAll = findAll;
module.exports.getCodeBlock = getCodeBlock;
module.exports.setSelectedCodeBlock = setSelectedCodeBlock;
