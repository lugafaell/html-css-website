const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  tipoItem: String,
  nomeItem: String,
  procedimentoItem: String,
  codeItem: String,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
