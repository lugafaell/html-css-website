// Importando os módulos necessários
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const registroRoutes = require("./routes/registro");
const faturamentoRoutes = require("./routes/faturamento");
const agendaRoutes = require("./routes/agenda");
const funcionarioRoutes = require("./routes/funcionario");
const itensRoutes = require("./routes/item");

require("dotenv").config();

// Criando uma instância do aplicativo Express
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Configurando a conexão com o MongoDB
const MONGODB_URI = process.env.DATABASE;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão com o MongoDB:"));
db.once("open", () => {
  console.log("Conexão estabelecida com o MongoDB.");
});

// Middleware para lidar com dados JSON
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/meta", dashboardRoutes);
app.use("/registrar", registroRoutes);
app.use("/faturamento", faturamentoRoutes);
app.use("/agenda", agendaRoutes);
app.use("/funcionario", funcionarioRoutes);
app.use("/item", itensRoutes);

// Definindo a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Iniciando o servidor e fazendo-o escutar na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta: ${PORT}`);
});
