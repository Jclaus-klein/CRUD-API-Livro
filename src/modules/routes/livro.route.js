// Importa o express para usar o recurso de Router.
import express from "express";

// Importa o controller de livros.
// Cada rota abaixo vai chamar um método desse controller.
import LivroController from "../controllers/livro.controller.js";

// Cria um roteador.
// O Router permite separar as rotas em arquivos menores e mais organizados.
const router = express.Router();

// Rota para listar todos os livros.
// Método GET é usado para buscar dados.
router.get("/listar", LivroController.listarTodos);

// Rota para listar um livro específico pelo ISBN.
// O trecho :isbn é um parâmetro de rota.
// Exemplo: /listar/9788535902778
router.get("/listar/:isbn", LivroController.listarPorIsbn);

// Rota para cadastrar um novo livro.
// Método POST é usado para criar um novo recurso.
router.post("/cadastrar", LivroController.cadastrar);

// Rota para editar completamente um livro.
// Método PUT é usado quando queremos enviar todos os dados editáveis.
router.put("/editar/total/:isbn", LivroController.editarTotal);

// Rota para editar parcialmente um livro.
// Método PATCH é usado quando queremos enviar apenas alguns campos.
router.patch("/editar/parcial/:isbn", LivroController.editarParcial);

// Esta rota precisa vir antes de /excluir/:isbn.
// Se viesse depois, a palavra "todos" poderia ser interpretada como um ISBN.
router.delete("/excluir/todos", LivroController.excluirTodos);

// Rota para excluir apenas um livro pelo ISBN.
router.delete("/excluir/:isbn", LivroController.excluirPorIsbn);

export default router;