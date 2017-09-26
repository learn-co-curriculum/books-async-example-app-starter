class Adapter {
  constructor(term) {
    this.term = term
  }

  fetchBooks() {
    const url = `${Adapter.baseUrl}?q=${this.term}`
    return fetch(url).then((res) => res.json())
  }
}

Adapter.baseUrl = 'https://www.googleapis.com/books/v1/volumes'
Adapter.maxResults = 10
