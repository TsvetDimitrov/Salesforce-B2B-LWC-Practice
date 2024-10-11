import { LightningElement } from 'lwc';
// Include googleapis and google domains in the allowed domains to avoid CSP errors 
const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q=' 

export default class BookApp extends LightningElement {
    query = 'Man'; // initial query
    books;
    timeout;

    connectedCallback() {
        this.fetchBookData();
    }

    fetchBookData() {
        fetch(BOOK_URL + this.query)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.books = data
            })
            .catch(error => console.error(error));
    }

    fetchBooksHandler(event) {
        this.query = event.target.value;
        window.clearTimeout(this.timeout);

        this.timeout = setTimeout(() => { // debounce function
            this.fetchBookData();
        }, 1000);
    }
}