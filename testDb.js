const db = require('./models');

db.User.create({
    name: 'Billy Bob',
    email: 'test2@test.com',
    password: '123123123'
}).then(user => {
    console.log(`📦 Successfully created a user!`);
    console.log(user);
    process.exit();
}).catch(err => {
    console.log(`🥶 Error creating user:\n${err}`);
    process.exit();
})
