const express = require('express');
const res = require('express/lib/response');
const {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts} = require('./utils/contact');
const app = express();
const {body, check, validationResult} = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const port = 3000;

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

// gunakan ejs
app.set('view engine', 'ejs');

// Built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

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
        msg: req.flash('msg')
    });
});

// Halaman form tambah data contact
app.get('/contact/add', (req,res)=>{
    res.render('add-contact', {
        title: 'Form tambah data contact'
    })
})

// Proses delete contact
app.get('/contact/delete/:nama', (req,res)=>{
    const contact = findContact(req.params.nama);

    // Jika contact tidak ada
    if(!contact){
        res.status(404);
        res.send(`<h1>404</h1>`);
    }else {
        deleteContact(req.params.nama);
        req.flash('msg', `Data ${req.params.nama} Berhasil dihapus`);
        res.redirect('/contact');
    }
});

// Ubah data contact
app.get('/contact/edit/:nama', (req,res)=>{
    const contact = findContact(req.params.nama);
    res.render('edit-contact', {
        title: 'Form edit data contact',
        contact
    })
})

// Proses ubah data
app.post('/contact/update', [
    body('nama').custom((nama, {req}) => {
        const duplikat = cekDuplikat(nama);
        if(nama !== req.body.oldNama && duplikat){
            throw new Error('Nama contact sudah digunakan!');
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(), 
    check('noHp', 'No Hanphone tidak valid!').isMobilePhone('id-ID')
], (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // return res.status(400).json({errors: errors.array()});
        res.render('edit-contact', {
            title: 'Form tambah ubah contact',
            errors: errors.array(),
            contact: req.body
        })
    }else{
        updateContacts(req.body);
        // Kirimkan flash message
        req.flash('msg', 'Berhasil');
        res.redirect('/contact');
    }
});

// Halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        title: 'Detail',
        contact
    });
});

// Proses data contact
app.post('/contact', [
    body('nama').custom(nama => {
        const duplikat = cekDuplikat(nama);
        if(duplikat){
            throw new Error('Nama contact sudah digunakan!');
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(), 
    check('noHp', 'No Hanphone tidak valid!').isMobilePhone('id-ID')
], (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // return res.status(400).json({errors: errors.array()});
        res.render('add-contact', {
            title: 'Form tambah data contact',
            errors: errors.array()
        })
    }else{
        addContact(req.body);
        // Kirimkan flash message
        req.flash('msg', 'Berhasil ditambahkan');
        res.redirect('/contact');
    }
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
