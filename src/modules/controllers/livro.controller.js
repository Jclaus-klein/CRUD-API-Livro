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
    // O find percorre o array e retorna o primeiro livro que satisfaz a condição.
    // Se nenhum livro for encontrado, o find retorna undefined.
    const livroEncontrado = livros.find((livro) => livro.isbn === isbn);

    return livroEncontrado;
  }

  // Edita todos os dados editáveis de um livro.
  // Nesta API, usamos PUT quando titulo e autor precisam ser enviados.
  static editarTotal(isbn, titulo, autor) {
    // Primeiro procuramos o livro pelo ISBN.
    const livro = LivroModel.listarPorIsbn(isbn);

    // Se o livro não existir, retornamos null para o controller tratar.
    if (!livro) {
      return null;
    }

    // Atualiza os dados do livro encontrado.
    livro.titulo = titulo;
    livro.autor = autor;

    // Retorna o livro já atualizado.
    return livro;
  }

  // Edita apenas os campos enviados.
  // Nesta API, usamos PATCH quando o usuário pode enviar somente titulo ou somente autor.
  static editarParcial(isbn, titulo, autor) {
    const livro = LivroModel.listarPorIsbn(isbn);

    if (!livro) {
      return null;
    }

    // Se titulo foi enviado, atualiza o titulo.
    if (titulo !== undefined) {
      livro.titulo = titulo;
    }

    // Se autor foi enviado, atualiza o autor.
    if (autor !== undefined) {
      livro.autor = autor;
    }

    return livro;
  }

  // Exclui um livro pelo ISBN.
  static excluirPorIsbn(isbn) {
    // findIndex retorna a posição do livro no array.
    // Se não encontrar, retorna -1.
    const index = livros.findIndex((livro) => livro.isbn === isbn);

    if (index === -1) {
      return null;
    }

    // splice remove itens do array.
    // Aqui removemos 1 item na posição encontrada.
    const livroRemovido = livros.splice(index, 1);

    // splice retorna um array com os itens removidos.
    // Como removemos apenas um livro, retornamos a posição 0.
    return livroRemovido[0];
  }

  // Exclui todos os livros do array.
  static excluirTodos() {
    // Definir length como 0 limpa o array original.
    livros.length = 0;

    return true;
  }
}

export default LivroModel;