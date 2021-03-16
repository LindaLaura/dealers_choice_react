const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, DATE, TEXT} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_react_db');


const Book = conn.define('book', {
    title:{
        type: STRING,
        allowNull: false
    },
    ISBN:{
        type: STRING,
        allowNull: false
    },
    published_date:{
        type: DATE,
        timestamps: true,
        dafaultValue: conn.fn('NOW')
    },
    image:{
        type: TEXT, 
        defaultValue:'https://www.abbeville.com/assets/common/images/edition_placeholder.png'
    }
});

const Author = conn.define('author', {
    name:{
        type: STRING,
        allowNull: false
    }
});

const Publisher = conn.define('publisher', {
    name:{
        type: STRING,
        allowNull: false
    }
});

const Book_Author = conn.define('book_author');


Book.belongsTo(Publisher);
Publisher.hasMany(Book);
Book.belongsToMany(Author, { through: Book_Author});
Author.belongsToMany(Book, { through: Book_Author});


const syncAndSeed = async() =>{
    await conn.sync({force: true});
    const[Harper_Festival, Square_Fish, Abdo, Bloomsburry, Mandadori] = await Promise.all([
        Publisher.create({name:'Harper Festival'}),
        Publisher.create({name:'Square Fish'}),
        Publisher.create({name:'Abdo'}),
        Publisher.create({name:'Bloomsburry'}),
        Publisher.create({name:'Mandadori'})
    ]);

    const[Butterfly_Wishes, The_Infinity_years_of_Avalon_James, La_Bella_e_la_Bestia, A_Streak_of_Tigers, Spotted_Dolphins, Thanksgiving_Helper, Crazy_Hair_Day] = await Promise.all([
        Book.create({
            title: 'Butterfly Wishes',
            ISBN: '978-1-68119-373-1',
            published_date: '12-26-2017',
            image: 'https://media.bloomsbury.com/rep/bj/9781681194929.jpg',
            publisherId: Bloomsburry.id
        }),
        Book.create({
            title: 'The Infinity years of Avalon James',
            ISBN: '978-1-250-12951-2',
            published_date: '10-11-2016',
            image: 'https://m.media-amazon.com/images/I/51IpMOOSO0L._SL500_.jpg',
            publisherId: Square_Fish.id
        }),
        Book.create({
            title: 'La Bella e la Bestia',
            ISBN: '88-04-36266-9',
            published_date: '01-01-2002',
            image: 'https://m.media-amazon.com/images/I/81zDvzLLHhL._SS500_.jpg',
            publisherId: Mandadori.id
        }),
        Book.create({
            title: 'A Streak of Tigers',
            ISBN: '978-1-61783-542-1',
            published_date: '08-01-2012',
            image: 'https://images-na.ssl-images-amazon.com/images/I/61aNQluzx9L.jpg',
            publisherId: Abdo.id
        }),
        Book.create({
            title: 'Spotted Dolphins',
            ISBN: '978-1-61613-415-0',
            published_date: '09-01-2010',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51FcgHbhzwL.jpg',
            publisherId: Abdo.id
        }),
        Book.create({
            title: 'Thanksgiving Helper',
            ISBN: '978-0-06-218774-1',
            published_date: '08-01-2014',
            image: 'https://s3-us-west-2.amazonaws.com/tabs.web.media/b/c/bcgr/bcgr-square-400.jpg',
            publisherId: Harper_Festival.id
        }),
        Book.create({
            title: 'Crazy Hair Day',
            ISBN: '978-0-06-218768-0',
            published_date: '05-13-2014',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51eptMSo45L.jpg',
            publisherId: Harper_Festival.id
        })
    ]);

    const [Alex_Kuskowski, Dana_Middleton, Jennifer_Castle, Claudia_Conti, Megan_M_Gunderson, Victoria_Kann] = await Promise.all(
        ['Alex_Kuskowski', 'Dana Middleton', 'Jennifer Castle', 'Claudia Conti', 'Megan M. Gunderson', 'Victoria Kann'].map(name => Author.create({name})));

    const booksAuthors = await Promise.all([
        Book_Author.create({
            bookId: Crazy_Hair_Day.id,
            authorId: Victoria_Kann.id
        }),
        Book_Author.create({
            bookId: Thanksgiving_Helper.id,
            authorId: Victoria_Kann.id
        }),
        Book_Author.create({
            bookId: Spotted_Dolphins.id,
            authorId: Megan_M_Gunderson.id
        }),
        Book_Author.create({
            bookId: La_Bella_e_la_Bestia.id,
            authorId: Claudia_Conti.id
        }),
        Book_Author.create({
            bookId: A_Streak_of_Tigers.id,
            authorId: Alex_Kuskowski.id
        }),
        Book_Author.create({
            bookId: Butterfly_Wishes.id,
            authorId: Jennifer_Castle.id
        }),
        Book_Author.create({
            bookId: The_Infinity_years_of_Avalon_James.id,
            authorId: Dana_Middleton.id
        }),
    ]);
}

module.exports = {
    models:{
        Book,
        Author,
        Publisher,
        Book_Author
    },
    conn,
    syncAndSeed
}