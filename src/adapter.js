class Adapter {
  constructor(term) {
    this.term = term
  }

  fetchBooks() {
    const url = `${Adapter.baseUrl}${this.term}`
    return fetch(url).then((res) => res.json())
  }
}

Adapter.baseUrl = 'https://www.googleapis.com/books/v1/volumes?q='
Adapter.maxResults = 10
