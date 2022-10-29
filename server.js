const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3700;
let products = [
    {
        id: 1,
        name: 'Telefono',
        price: 150
    }
];

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome New User')
})

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const newProduct = {...req.body, id: products.length + 1}
    products.push(newProduct);
    res.send(newProduct);
});

app.put('/products/:id', (req, res) => {
    const idFound = parseInt(req.params.id);
    const newData = req.body
    const productFound = products.find(p => p.id === idFound)

    if(!productFound){
        return res.status(404).json({
            "error": true, "msg": "producto no existe"
        });
    }

    products = products.map(p => p.id === idFound ? {...p, ...newData} : p);
    res.json({
        "error": false, "msg": "Producto actualizado"
    });
});

app.delete('/products/:id', (req, res) => {
    const idFound = parseInt(req.params.id)
    const productFound = products.find(p => p.id === idFound)

    if(!productFound){
        return res.status(404).json({
            "error": true, "msg": "producto no existe"
        });
    }

    products = products.filter(p => p.id !== idFound);
    res.sendStatus(204);
});

app.get('/products/:id', (req, res) => {
    const idFound = parseInt(req.params.id)
    const productFound = products.find(p => p.id === idFound)

    if(!productFound){
        return res.status(404).json({
            "error": true, "msg": "producto no existe"
        });
    }

    res.json(productFound);
});

app.listen(port);
console.log(`Server on port ${port}`)