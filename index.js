const app = {
  indexView: true
}

function appendBooks(response) {
  response.items.forEach((bookData) => {
    const book = new Book(bookData.volumeInfo)
    app.list.appendChild(book.renderListItem())
  })
}


function searchBooks(ev) {
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

function findBook(ev) {
  ev.preventDefault()
  const clickedEl = ev.target

  if (clickedEl.className === 'header') {
    app.indexView = false
    list.innerHTML = ''
    show.innerHTML = ''

    const book = Book.findByTitle(clickedEl.innerText)
    show.appendChild(book.renderCard())
  }
}

function loadBooks(ev) {
  if (app.indexView && document.body.scrollHeight == Math.floor(document.body.scrollTop + window.innerHeight)) {
    adapter.incrementStartIndex()
    adapter.fetchBooks()
      .then(appendBooks)
  }
}

document.addEventListener('DOMContentLoaded', function(){
  app.form = document.querySelector('form.ui.form')
  app.list = document.querySelector('div.ui.relaxed.divided.list')
  app.show = document.querySelector('div.book.show')

  // form submit event
  app.form.addEventListener('submit', searchBooks)

  // book click event (event delegation with vanilla js)
  app.list.addEventListener('click', findBook)

  // scroll to bottom event
  document.addEventListener('scroll', loadBooks)

})
