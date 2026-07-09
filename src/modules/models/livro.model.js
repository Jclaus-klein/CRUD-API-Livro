// Importa o array de livros que está simulando nosso banco de dados.
import livros from "../../../config/database.js";

// O Model é a camada responsável por lidar diretamente com os dados.
//
// Neste projeto, o model mexe no array livros:
// - adiciona livro
// - lista livro
// - edita livro
// - exclui livro
//
// Os métodos são static porque não precisamos criar objetos com new LivroModel().
// Chamamos direto assim: LivroModel.cadastrar(...).
class LivroModel {
  // Cadastra um novo livro no array.
  static cadastrar(isbn, titulo, autor) {
    // Verifica se já existe um livro com o mesmo ISBN.
    const livroExistente = LivroModel.listarPorIsbn(isbn);

    if (livroExistente) {
      return null;
    }

    // Cria um objeto com as informações recebidas.
    const novoLivro = { isbn, titulo, autor };

    // Adiciona o livro no final do array.
    livros.push(novoLivro);

    // Retorna o livro criado para quem chamou o método.
    return novoLivro;
  }

  // Retorna todos os livros cadastrados.
  static listarTodos() {
    return livros;
  }

  // Busca um livro pelo ISBN.
  static listarPorIsbn(isbn) {
    const livroEncontrado = livros.find((livro) => livro.isbn === isbn);

    return livroEncontrado;
  }

  // Edita todos os dados editáveis de um livro.
  static editarTotal(isbn, titulo, autor) {
    const livro = LivroModel.listarPorIsbn(isbn);

    if (!livro) {
      return null;
    }

    livro.titulo = titulo;
    livro.autor = autor;

    return livro;
  }

  // Edita apenas os campos enviados.
  static editarParcial(isbn, titulo, autor) {
    const livro = LivroModel.listarPorIsbn(isbn);

    if (!livro) {
      return null;
    }

    if (titulo !== undefined) {
      livro.titulo = titulo;
    }

    if (autor !== undefined) {
      livro.autor = autor;
    }

    return livro;
  }

  // Exclui um livro pelo ISBN.
  static excluirPorIsbn(isbn) {
    const index = livros.findIndex((livro) => livro.isbn === isbn);

    if (index === -1) {
      return null;
    }

    const livroRemovido = livros.splice(index, 1);

    return livroRemovido[0];
  }

  // Exclui todos os livros do array.
  static excluirTodos() {
    livros.length = 0;

    return true;
  }
}

export default LivroModel;
