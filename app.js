const express = require('express');
const res = require('express/lib/response');
const {loadContact, findContact} = require('./utils/contact');
const app = express();
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');

// Built-in middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.sendFile('/view/index.html', {root: __dirname});
    res.render('index', {
        title: "Home", 
    });
});

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {
        title: "contact",
        contacts,
    });
});

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        title: 'Detail',
        contact
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About"
    });
})


app.use('/',(req,res)=>{
    res.status(404);
    res.send('<b>File Not Found<b>');
});

app.listen(port, ()=>{
        console.log(`listening ${app}`);
})
