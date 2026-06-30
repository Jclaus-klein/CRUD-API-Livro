import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const porta = process.env.PORTA;

const livro = [];

app.get("/listar", (requisicao, resposta) => {
  try {
    if (livro.length === 0) {
      return resposta.status(200).json({ mensagem: "Nenhum livro cadastrado!" });
    }
    resposta.status(200).json(livro);
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao listar os livros", erro: error });
  }
});

// Endpoint para listar livros pelo isbn
// http://localhost:3000/listar/a92222
app.get("/listar/:isbn", (requisicao, resposta) => {
  try {
    const isbn = requisicao.params.isbn;
    // const livros = [{},{},{}]
    const livro_procurado = livro.find(livro => livro.isbn === isbn);

    // e se os livros que eu estou procurando não existirem?
    if(!livro_procurado){
        return resposta.status(200).json({mensagem: "Livro não encontrado!"})
    }

    resposta.status(200).json(livro_procurado)
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao listar o livro", erro: error})
  }
});

// Endpoint para cadastrar um livro
app.post("/cadastrar", (requisicao, resposta) => {
  try {
    // corpo da requisição com os dados que preciso
    const { isbn, titulo, autor } = requisicao.body
    // Vericando se todos os campos foram preenchidos, caso não retorna erro 400
    if(!isbn || !titulo || !autor){
      return resposta.status(400).json({mensagem:"Todos os campos são obrigatorios!"})
    }
    // salvando os dados que enviei ao servidor pela req
    const dados = { isbn, titulo, autor }
    // Salvando os dados em array(memoria) via push
    const aluno = livro.push(dados)

    // resposta informando que o livro foi cadastrado
    resposta.status(201).json({mensagem: "Cadastro realizado com sucesso!" , livro: livro})
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao cadastrar usuario!"})
  }
})


app.listen(porta, () => {
  console.log(`O servidor está em execução!`);
});

