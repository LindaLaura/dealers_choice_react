const router = require('express').Router();
const { models:{Book, Author, Publisher,Book_Author}} = require('../db');


router.get('/books', async(req, res, next)=>{
    try{
        res.send(await Book.findAll({
            include:[{
                model: Publisher
             },
             {
                model: Author
            }]
        }))
    }
    catch(ex){
        next(ex)
    }
});

router.post('/books', async(req, res, next) =>{
    try{
        //const [title, author_name, ISBN, published_date, publisher_name] = req.body;
        const createdBook = req.body;
        console.log(createdBook);
        // for (let i = 0; i< books.length; i++){
        //   if(createdBook.title === books[i])
        //   {res.sendStatus(409);}
        // }  
        await Promise.all([
            // Publisher.create({
            //     name:req.body.publisher_name
            // }),
            Book.create({
                title: req.body.title,
                ISBN:req.body.ISBN,
                published_date: req.body.published_date,
                publisherId: req.body.publisher_name.id
            }),
            Author.create({
                name: req.body.author_name,
            }),
        ]);
    }
    catch(ex){
        next(ex);
    }
})

router.get('/books/:id', async(req, res, next)=>{
    try{
        res.send(await Book.findAll({
            attributes:['title', 'ISBN', 'image', 'published_date'],
            include:[{
                model: Publisher,
                attributes:[['name', 'publisher_name']]
             },
             {
                model:Author,
                attributes:[['name', 'author_name']]
            }],
            where:{
                id: req.params.id
            }})
        )
    }
    catch(ex){
        next(ex)
    }
});

module.exports = router;