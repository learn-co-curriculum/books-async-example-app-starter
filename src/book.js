const Book = (() => {
  const all = [];

  return class Book {
    constructor(props) {
      this.id = props.id;
      this.title = props.title;
      this.author = props.author;
      this.imageLink = props.imageLink;
      this.description = props.description;
      this.pages = props.pages;
      this.averageRating = props.averageRating;
      all.push(this);
    }

    static all() {
      return all;
    }

    static findById(bookId) {
      return all.find(({ id }) => {
        return id === bookId;
      });
    }

    static findByTitle(searchTerm) {
      return all.filter(({ title }) => {
        return title.toLowerCase().includes(searchTerm);
      });
    }

    renderListItem() {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
      <i class="large book middle aligned icon"></i>
      <div class="content">
        <a data-id="${this.id}" class="header" href="/">${this.title}</a>
        <div class="description">
          ${this.author}
        </div>
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
  };
})();
