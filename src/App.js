import React from 'react';
import axios from 'axios';
import BooksList from './BooksList'
import SingleBook from './SingleBook';

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            books: [],
            selectedBook:{},
            selectedBookId: ''
        }
        this.pickBook = this.pickBook.bind(this);
    }
    async componentDidMount(){
        const data = (await axios.get('/api/books')).data;
        this.setState({
            books: data
        });
        window.addEventListener('hashchange', () =>{
            this.setState({
                selectedBookId :window.location.hash.slice(1)
            });
        })
        // this.setState({
        //     selectedBookId :window.location.hash.slice(1)
        // });
    }

     async pickBook (bookId){
        const data = ( await axios.get(`/api/books/${bookId }`)).data;
        this.setState({
            selectedBook: data
        });
        //console.log(data);
    }

    render(){
         //console.log(this.pickBook);
        // console.log(this.state.selectedBookId);
        return(
            <div id='app'>
                <h1>BOOKS</h1>{
                this.state.selectedBookId
                ?
                <SingleBook book={this.state.selectedBook}/>
                : 
                <BooksList books={this.state.books} pickBook={this.pickBook}/> 
                }
            </div>
        );
    }
}

export default App;