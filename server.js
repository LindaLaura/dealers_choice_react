const { syncAndSeed, models:{Book, Author, Publisher,Book_Author}, conn} = require('./db');
const express = require('express');
const path = require('path');


const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use( express.static(path.join(__dirname, 'public')));
app.use(require('method-override')('_method'));
app.use('/api', require('./api'));

// accept url encoded
app.use(require('body-parser').urlencoded({
  extended: true
}));

// accept json 
app.use(require('body-parser').json());



app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


const PORT = 1337;
const init = async()=>{
    try{
        await syncAndSeed();
        app.listen(PORT, () => console.log(`
          Listening on port ${PORT}
          http://localhost:${PORT}/
      `));
    }
    catch (err) {
    console.log(`There was an error starting up!`, err);
    }
    
}

init();