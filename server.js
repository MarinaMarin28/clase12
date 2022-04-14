const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')

 
const {getProducts, AddProducts} = require('./controller/products.js');

let messages = [
];

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));

io.on('connection', function(socket) {
    socket.emit('messages', messages);  
    socket.on('new-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages); 
    });    
});

app.get('/', async (req, res) =>{
    let products = await getProducts();
    products.length > 0 
    ?
    res.render('/', {products})
    :
    res.status(400).json({message: 'Theres no products'})
;} );

app.post('/productos', async (req, res) => {
    const productNew = req.body;
    let products = await AddProducts(productNew);
    products != null?
    res.redirect('/')
    :
    res.status(400).json({message: 'product could not be loaded'})
} );
const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))