require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const userRouter = require('./routes/userRouter');
const bodyparser = require('body-parser');


const port = 3000;
var app = express();

app.use(bodyparser.urlencoded({
      extended: true
}));

app.use(bodyparser.json());



app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
    },
    layoutDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');



app.listen(port, () => {
    console.log(`Express server running at port: ${port}`);
});

app.use('/users', userRouter);



