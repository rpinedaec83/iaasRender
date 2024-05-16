// const express = require('express'); 
// const app = express(); 
  
// // Set EJS as templating engine 
// app.set('view engine', 'ejs');
// app.get('/', (req, res) => { 

//     let data = { 
//         name: 'Akashdeep', 
//         hobbies: ['playing football', 'playing chess', 'cycling'] 
//     } 
// 	res.render('home',{ data: data }); 

// });
// const server = app.listen(4000, function () { 
//     console.log('listening to port 4000') 
// });
const config = require('./common/config/env.config.js');
require('dotenv').config();
const express = require('express');
const app = express();

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

const server = app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

