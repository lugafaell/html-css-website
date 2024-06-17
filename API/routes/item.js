const express = require("express");
const Item = require("../models/itens");

const router = express.Router();

router.post("/itens", async (req, res) => {
  const { nomeItem, procedimentoItem, tipoItem, codeItem } = req.body;

  if (!nomeItem || !procedimentoItem || !tipoItem || !codeItem) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const novoItem = new Item({
      nomeItem,
      procedimentoItem,
      tipoItem,
      codeItem,
    });
    await novoItem.save();
    res.status(201).json({ message: "Item registrado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar o Item", error });
  }
});

router.get("/itens", async (req, res) => {
  const { nome, procedimento, tipo, code } = req.query;

  try {
      const query = {};
      if (nome) query.nomeItem = nome;
      if (procedimento) query.procedimentoItem = procedimento;
      if (tipo) query.tipoItem = tipo;
      if (code) query.codeItem = code;

      const itens = await Item.find(query);
      res.status(200).json(itens);
  } catch (error) {
      res.status(500).json({ message: "Erro ao obter Itens", error });
  }
});

module.exports = router;
