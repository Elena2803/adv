class ProductList {
    #goods;
    #allProducts;

    constructor(container = ".products") {
        console.log('constructor');
        this.container = container;
        this.#goods = [];
        this.#allProducts = [];

        this.#fetchGoods();
        this.#render();
    }

    #fetchGoods() {
        this.#goods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];
    }

    #render() {
        const block = document.querySelector(this.container);

        this.#goods.forEach((product) => {
            const productObject = new ProductItem(product);
            console.log(productObject);
            this.#allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        });
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class='product-item' data-id='${this.id}'>
            <img src='${this.img}' alt='Some img'>
                <div class='desc'>
                    <h3>${this.title}</h3>
                    <p>${this.price}\u20bd</p>
                    <button class='buy-btn'>Купить</button>
                </div>
                </div>`;
    }
}

const productList = new ProductList();


/*const products = [
    {id: 1, title: 'Notebook', price: 20000 },
    {id: 2, title: 'Mouse', price: 1500 },
    {id: 3, title: 'Keyboard', price: 5000 },
    {id: 4, title: 'Gamepad', price: 4500 },
];

const renderProduct = ({title, price}, img='https://placehold.it/200x150') =>
    `<div class='product-item' data-id='${this.id}'>
                <img src='${img}' alt='Some img'>
                    <div class='desc'>
                        <h3>${title}</h3>
                        <p>${price}\u20bd</p>
                        <button class='by-btn'>Добавить в корзину</button>
                    </div>
    </div>`;


const renderProducts = list => {
                    document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
};

renderProducts(products);*/