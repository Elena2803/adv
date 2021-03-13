Vue.component('cart', {
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',
            cartUrl: '/getBasket.json',
            cartitems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartitems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartitems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartitems.splice(this.cartitems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartitems.push(el);
                }
            });
    },
    template: `
    <div>
        <button class='btn-cart' type='button' @click="showCart=!showCart">Корзина</button>
            <div class='cart-block' v-show="showCart">
                <p v-if="!cartitems.length">Корзина пуста</p>
                <cart-item class='cart-item'
                 v-for="item of cartitems"
                :key="item.id_product"
                :cart-item="item"
                :img="imgCart"
                @remove="remove">
                </cart-item>
            </div>
    </div>`
});

Vue.component('cart-item', {
    props: ['cartitem', 'img'],
    template: `
    <div class='cart-item'>
        <div class='product-bio'>
            <img :src="img" alt='Some image'>
             <div class='product-desc'>
                <p class='product-title'>{{cartitem.product_name}}</p>
                <p class='product-quantity'>Количество:{{cartitem.quantity}}</p>
                 <p class='product-single-price'>{{cartitem.price}}₽ за единицу</p>
            </div>
        </div>
        <div class='right-block'>
            <p class='product-price'>{{cartitem.quantity*cartitem.price}}₽</p>
            <button class='del-btn' @click="$emit('remove',cartitem)">&times;</button>
        </div>
    </div>`
});