let form
let list
let show

function appendBooks(response) {
  response.items.forEach((bookData) => {
    const book = new Book(bookData.volumeInfo)
    list.appendChild(book.renderListItem())
  })
}

function searchBooks(ev) {
  ev.preventDefault()
  const term = ev.target.querySelector('input').value

  list.innerHTML = ''
  show.innerHTML = ''
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
    list.innerHTML = ''
    show.innerHTML = ''

    const book = Book.findByTitle(clickedEl.innerText)
    show.appendChild(book.renderCard())
  }
}

function loadBooks(ev) {
  if (document.body.scrollHeight == Math.floor(document.body.scrollTop + window.innerHeight)) {
    console.log('bottom')
  }
}



document.addEventListener('DOMContentLoaded', function(){
  form = document.querySelector('form.ui.form')
  list = document.querySelector('div.ui.relaxed.divided.list')
  show = document.querySelector('div.book.show')

  // form submit event
  form.addEventListener('submit', searchBooks)

  // book click event (event delegation with vanilla js)
  list.addEventListener('click', findBook)

  // scroll to bottom event
  document.addEventListener('scroll', loadBooks)

})
