import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const porta = process.env.PORTA || 3000;

const livro = [];

// Endpoint Cadastrar livro
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

// Endpoint Listar todos os livros
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

// Endpoint Listar por ISBN
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

//Endpoint para Editar livro
app.put("/editar/:isbn", (requisicao, resposta) => {
  try {
    const isbn = requisicao.params.isbn;
    const editar = livro.find((l) => l.isbn === isbn);
    if (!editar) {
      return resposta.status(404).json({ mensagem: "Livro não encontrado!" });
    }
    // enviando para o servidor novos dados para editar o livro
    const { novoTitulo, novoAutor } = requisicao.body;
    if (!novoTitulo || !novoAutor) {
      return resposta
        .status(400)
        .json({ mensagem: "Todos os campos para edição são obrigatorios!" });
    }

    editar.titulo = novoTitulo;
    editar.autor = novoAutor;

    resposta.status(200).json({ mensagem: "Livro atualizado com sucesso!" });
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro ao editar o livro!", erro: error });
  }
});
app.patch("/editar/:isbn", (requisicao, resposta) => {
 try {
    const isbn = requisicao.params.isbn;
    const editar = livro.find((l) => l.isbn === isbn);
    if (!editar) {
      return resposta.status(404).json({ mensagem: "Livro não encontrado!" });
    }
    // enviando para o servidor novos dados para editar o livro
    const { novoTitulo, novoAutor } = requisicao.body;
    if (!novoTitulo || !novoAutor) {
      return resposta
        .status(400)
        .json({ mensagem: "Todos os campos para edição são obrigatorios!" });
    }

    editar.titulo = novoTitulo;
    editar.autor = novoAutor;

    resposta.status(200).json({ mensagem: "Livro atualizado com sucesso!" });
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro ao editar o livro!", erro: error });
  }
});

//Endpoint para deletar todos os livros
app.delete("/excluir/todos", (requisicao, resposta) => {
  try {
    livro.length = 0;
    resposta
      .status(200)
      .json({ mensagem: "Todos os livros foram excluidos com sucesso!" });
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao excluir todos os livros!" });
  }
});

//Endpoint para Deletar livro pelo ISBN
app.delete("/deletar/:isbn", (requisicao, resposta) => {
  try {
    const isbn = requisicao.params.isbn;
    const livro_a_deletar = livro.find((l) => l.isbn === isbn);
    if (!livro_a_deletar) {
      return resposta.status(404).json({ mensagem: "Livro não encontrado!" });
    }

    const index = livro.indexOf(livro_a_deletar);
    livro.splice(index, 1);

    resposta.status(200).json({ mensagem: "Livro deletado com sucesso!" });
  } catch (error) {
    resposta
      .status(500)
      .json({ mensagem: "Erro ao deletar o livro!", erro: error });
  }
});

app.listen(porta, () => {
  console.log(`Servidor em execução na porta ${porta}`);
});
