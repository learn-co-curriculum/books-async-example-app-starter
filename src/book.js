class Book {
  constructor(attr) {
    this.title = attr.title
    this.description = attr.description
    this.author = attr.authors ? attr.authors[0] : 'Unknown'
    this.pages = attr.pageCount
    this.imageUrl = attr.imageLinks.thumbnail

    Book.all.push(this)
  }

  static findByTitle(title) {
    return this.all.find((book) => book.title === title)
  }

  renderListItem() {
    const div = document.createElement('div')
    div.className = "item"

    div.innerHTML = `
      <i class="large book middle aligned icon"></i>
      <div class="content">
        <a class="header" href="/">${this.title}</a>
        <div class="description">
          ${this.author}
        </div>
      </div>
      `

    return div
  }

  renderCard() {
    const div = document.createElement('div')
    div.className = "ui fluid card"

    div.innerHTML = `
      <div class="image">
        <img src="${this.imageUrl}"/>
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
      `
      return div
  }

}

Book.all = []
