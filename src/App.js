import React from 'react';
import axios from 'axios';
import BooksList from './BooksList'

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            books: []
        }
    }
    async componentDidMount(){
        const data = (await axios.get('/api/books')).data;
        this.setState({
            books: data
        });
        //console.log({data});
    }

    render(){
        const {books} = this.state; 
        return(
            <div id='app'>
                <h1>BOOKS</h1>
                <BooksList books={books} />
            </div>
        );
    }
}

export default App;