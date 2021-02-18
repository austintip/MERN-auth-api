require('dotenv').config();
const CORS = require('cors');
const EXPRESS = require('express');

const APP = EXPRESS();

// middleware
APP.use(CORS());
APP.use(EXPRESS.urlencoded({ extended: false}));
APP.use(EXPRESS.json());

//Routes
APP.get('/', (req, res) => {
    res.json({ message: "MERN app API Home"})
})

// Controllers
APP.use('/api', require('./controllers/auth'))

APP.listen(process.env.PORT || 3000, () => {
    console.log(`You're listening to the smooth sounds of Port ${process.env.PORT || 3000}`);
});