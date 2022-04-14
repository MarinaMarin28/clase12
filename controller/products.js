let products = [
    {'title': 'titulo1', 'price': 10, 'thumbnail': 'url1', 'id': 1},
    {'title': 'titulo2', 'price': 20.06, 'thumbnail': 'url2', 'id': 2},
    {'title': 'titulo3', 'price': 30.99, 'thumbnail': 'url3', 'id': 3},
    {'title': 'titulo2', 'price': 99.01, 'thumbnail': 'url4', 'id': 4},
]
let productsPromise = new Promise((resolve, reject) => {
    resolve(products);
});

const getProducts = () => {
    return productsPromise;
};

const getProductsById =  id => {
    try {
        const productFilter = products.filter(p => p.id === id)
        const product = {
            title: productFilter[0].title,
            price: productFilter[0].price,
            thumbnail: productFilter[0].thumbnail,
            id: productFilter[0].id
        }
        return product;
    } catch (error) {
        return `Error: producto no encontrado`;
    }
}

const AddProducts = async product => {
    const idLast = products.length;
    const productLast = await getProductsById(idLast);
    let newId =  productLast.id + 1;
    let productNew =  {'title': product.title, 'price': product.price, 'thumbnail': product.thumbnail, 'id': newId};
    products.push(productNew);
    return 'Producto Cargado';
};

const updateProductsById = async newProduct => {
    try {
        const productsAux = products.filter(p => p.id != newProduct.id);
        const productFilter = await getProductsById(newProduct.id);
        productFilter.id = newProduct.id
        productFilter.title = newProduct.title
        productFilter.price = newProduct.price
        productFilter.thumbnail = newProduct.thumbnail
        products = productsAux;
        products.push(productFilter);
        return productFilter;
    } catch (error) {
        return `Error: producto no encontrado`;
    }
    
}

const deleteProductsById =  id => {
    const productAux = products.filter(p => p.id != id)
    products = productAux;
    return products;
}

module.exports = {getProducts, AddProducts};