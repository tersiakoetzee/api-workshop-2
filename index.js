const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const Favorite = require('./factory')

const pg = require("pg");
const Pool = pg.Pool;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://codex:codex123@localhost/cars_db"
});

const createCar = Favorite(pool)

const app = express();

app.use(session({
    secret: 'keyboard cat5 run all 0v3r',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
let BrandList = ["Nissan", "Toyota", "Mazda"];

app.get('/api/brand_list', (req, res) => {
    res.json(BrandList)
})

app.post('/api/brand_add', (req, res) => {
    BrandList.push(req.body.brand_name)
    res.json({
        status: 'success'
    });
})

app.post('/api/favorites', async(req, res) => {
   try {
    await createCar.addFavorites(req.body);
    res.json({
        status: 'success',
        message: 'Favorites',
    });
   } catch (error) {
       console.log(error)
   } 
})

app.get('/api/favorites', async(req, res) => {
    let favorites = await createCar.getFavorites();

    res.json({
        status: 'success',
        message: 'Favorites',
        data: favorites
    });
})

const PORT = process.env.PORT || 3022;

app.listen(PORT, function () {
    console.log('started on: ', this.address().port);
});
