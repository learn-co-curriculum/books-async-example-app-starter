class Adapter {
  constructor(term) {
    this.term = term
    this.startIndex = 0
  }

  incrementStartIndex() {
    this.startIndex += Adapter.maxResults
  }

  fetchBooks() {
    const url = `${Adapter.baseUrl}${this.term}&startIndex=${this.startIndex}`
    return fetch(url).then((res) => res.json())
  }
}

Adapter.baseUrl = 'https://www.googleapis.com/books/v1/volumes?q='
Adapter.maxResults = 10
