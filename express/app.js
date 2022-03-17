const express = require('express');
// const http = require('http');
// const fs  = require('fs');
const app = express();
const port = 3000

app.get('/', (req, res) => {
    // res.send('Hello World');
    // res.json({
    //     nama: 'Roxyzc',
    //     umur: 18
    // })
    res.sendFile('./index.html', {root: __dirname});
});

app.get('/about', (req, res) => {
    res.send('ini halaman about');
});

app.get('/coba/:id', (req, res)=>{
    res.send(`Product ID: ${req.params.id} <br> Category ID : ${req.query.category}`);
});

app.use('/',(req,res)=>{
    res.status(404);
    res.send('<b>File Not Found<b>');
});

app.listen(port, ()=>{
        console.log(`listening ${app}`);
})



    // Menggunakan HTTP
// http.createServer((req,res)=>{
//     const url = req.url;
//     res.writeHead(200, {
//         'Content-Type' : 'text/html'
//     })
//     if(url === '/about'){
//         res.write('<p>HTTP</p>');
//         res.end();
//     }else{
//         fs.readFile('./index.html', (err, data)=>{
//             if(err){
//                 res.writeHead(404);
//             }
//             res.write(data);
//             res.end();
//         })
//     }
// }).listen(port, ()=>{
//     console.log(`listening ${app}`);
// })