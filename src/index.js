import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const porta = process.env.PORTA || 3000;

const livro = [];

// Listar todos os livros
app.get("/listar", (requisicao, resposta) => {
  try {
    if (livro.length === 0) {
      return resposta
        .status(200)
        .json({ mensagem: "Nenhum livro cadastrado!" });
    }
    resposta.status(200).json(livro);
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro ao listar os livros", erro: error });
  }
});

// Listar por ISBN
app.get("/listar/:isbn", (requisicao, resposta) => {
  try {
    const isbn = requisicao.params.isbn;

    const livro_procurado = livro.find((l) => l.isbn === isbn);

    if (!livro_procurado) {
      return resposta.status(404).json({ mensagem: "Livro não encontrado!" });
    }

    resposta.status(200).json(livro_procurado);
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro ao listar o livro", erro: error });
  }
});

// Cadastrar livro
app.post("/cadastrar", (requisicao, resposta) => {
  try {
    const { isbn, titulo, autor } = requisicao.body;

    if (!isbn || !titulo || !autor) {
      return resposta
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    const existe = livro.find((l) => l.isbn === isbn);
    if (existe) {
      return resposta.status(400).json({ mensagem: "ISBN já cadastrado!" });
    }

    const dados = { isbn, titulo, autor };
    livro.push(dados);

    resposta.status(201).json({
      mensagem: "Cadastro realizado com sucesso!",
      livro: dados,
    });
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao cadastrar livro!" });
  }
});

app.listen(porta, () => {
  console.log(`Servidor em execução na porta ${porta}`);
});