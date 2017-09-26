// Google Books API docs:
// https://developers.google.com/books/docs/v1/using
// Here is an example using a search term
// const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q='

// Here is an example of searching an author
//GET https://www.googleapis.com/books/v1/volumes?q=inauthor:pynchon

const app = {
  indexView: true
}

function appendBooks(response) {
  response.items.forEach((bookData) => {
    const book = new Book(bookData.volumeInfo)
    app.list.appendChild(book.renderListItem())
  })
}

function search(ev) {
  ev.preventDefault()
  const term = ev.target.querySelector('input').value

  app.indexView = true
  app.list.innerHTML = ''
  app.show.innerHTML = ''
  Book.all = []
  ev.target.querySelector('input').value = ''

  adapter = new Adapter(term)
  adapter.fetchBooks()
    .then(appendBooks)
}



function showBook(title) {
  app.indexView = false
  app.list.innerHTML = ''
  app.show.innerHTML = ''

  const book = Book.findByTitle(title)

  app.show.appendChild(book.renderCard())
}




document.addEventListener('DOMContentLoaded', function(){
  app.form = document.querySelector('form.ui.form')
  app.list = document.querySelector('div.ui.relaxed.divided.list')
  app.show = document.querySelector('div.book.show')

  // form submit event
  app.form.addEventListener('submit', search)

  // book click event (event delegation with vanilla js)
  app.list.addEventListener('click', (ev) => {
    ev.preventDefault()
    const clickedEl = ev.target
    if (clickedEl.className === 'header') {
      showBook(clickedEl.innerText)
    }
  })

  // scroll to bottom event
  document.addEventListener('scroll', (ev) => {
    if (app.indexView && document.body.scrollHeight == Math.floor(document.body.scrollTop + window.innerHeight)) {

      adapter.incrementStartIndex()
      adapter.fetchBooks()
        .then(appendBooks)
    }
  })

})
