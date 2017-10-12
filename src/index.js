const fetchBooks = () => data.books;

document.addEventListener('DOMContentLoaded', function() {
  const books = fetchBooks();
  const list = document.querySelector('.ui.relaxed.divided.list');
  const form = document.querySelector('form.ui.form');

  books.forEach(bookData => {
    const book = new Book(bookData);
    list.appendChild(book.renderItem());
  });

  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const input = ev.target.querySelector('input');
    const term = input.value.toLowerCase();
    input.value = '';
    list.innerHTML = '';

    Book.findByTitle(term).forEach(book => {
      list.appendChild(book.renderItem());
    });
  });

  list.addEventListener('click', ev => {
    const clicked = ev.target;
    if (clicked.className === 'header') {
      ev.preventDefault();
      list.innerHTML = '';

      const book = Book.find(clicked.dataset.id);
      list.appendChild(book.renderCard());
    }
  });
});

class Book {
  constructor(props) {
    const { id, title, author, pages, imageLink, description } = props;
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.imageLink = imageLink;
    this.description = description;
    this.constructor.all.push(this);
  }

  static find(val) {
    return Book.all.find(({ id }) => id === parseInt(val));
  }

  static findByTitle(title) {
    return Book.all.filter(book => {
      return book.title.toLowerCase().indexOf(title) !== -1;
    });
  }

  renderItem() {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <i class="large book middle aligned icon"></i>
      <div class="content">
        <a data-id="${this.id}" class="header" href="/">
          ${this.title}
        </a>
        <div class="description">${this.author}</div>
      </div>
      `;
    return div;
  }

  renderCard() {
    const div = document.createElement('div');
    div.className = 'ui fluid card';
    div.innerHTML = `
      <div class="image">
        <img src="${this.imageLink}"/>
      </div>
      <div class="content">
        <h1 class="ui header">
          ${this.title}
          <div class='sub header'>
            ${this.author}
          </div>
        </h1>
        <div class="meta">
          <span>${this.pages} pages</span>
        </div>
        <div class="ui divider"></div>
        <div class="description">
          ${this.description}
        </div>
      </div>
    `;
    return div;
  }
}

Book.all = [];
