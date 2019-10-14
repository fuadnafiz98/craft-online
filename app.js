var k = 0;
const cartBtn = document.querySelector(".shop-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cheakoutCartBtn = document.querySelector(".cheakout-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDom = document.querySelector(".products-center");

// * cart
let cart = [];

let buttonsDOM = [];
// Getting products
class Products {
    async getProducts() {
        try {

            let result = await fetch('products.json');
            let data = await result.json();

            let products = data.items;
            products = products.map(item => {
                const {
                    title,
                    price
                } = item.fields;
                const {
                    id
                } = item.sys;
                const image = item.fields.image.fields.file.url;
                return {
                    title,
                    price,
                    id,
                    image
                }
            })
            return products;
        } catch (err) {
            console.log(err);
        }
    }
}

// display products
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            // console.log(product.title);
            let mes = product.title;
            result += `
                <article class = "product">
                    <p class = "img-container">
                    <a href = "#">
                    <img src = ${product.image} alt = "product" class = "product-img img-fluid"
                        data-id =${product.id} onclick = "own(this)">
                    </a>
                    </p>
                    <h3> ${product.title} </h3> 
                    <h4 > ${product.price} $ </h4> 
                    <button class = "cart-btn" data-id =${product.id} >
                    <i class = "fas fa-shopping-cart"> </i>
                    Add to cart
                    </button> 
                    </article>
            `;
        });
        productsDom.innerHTML = result;
    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll(".cart-btn")];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id == id);
            if (inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }
            button.addEventListener('click', (event) => {
                event.target.disabled = true;
                // * get product from products
                let cartItem = {
                    ...Storage.getProduct(id),
                    ammount: 1
                };
                // * add product to the cart
                cart = [...cart, cartItem];
                // * save cart to local storage
                Storage.saveCart(cart);
                // * set cart values
                this.setCartValues(cart);
                // * display cart items
                this.addCartItem(cartItem);
                // * show the cart
                this.showCart();
            });
        });
    }
    setCartValues(cart) {
        let temptotal = 0;
        cart.map(item => {
            temptotal += item.price * item.ammount;
        })
        cartTotal.innerText = parseFloat(temptotal.toFixed(2));
    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img src=${item.image} alt="product">
          <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id = ${item.id}>remove</span>
          </div>
          <div>
            <i class="fas fa-chevron-up" data-id = ${item.id}></i>
            <h5 class="item-amount">${item.ammount}</h5>
            <i class="fas fa-chevron-down" data-id = ${item.id}></i>
          </div>
          `;
        cartContent.appendChild(div);
    }
    showCart() {
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    setupApp() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populate(cart);
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.hideCart);
    }
    populate(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    hideCart() {
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    }
    cartLogic() {
        cheakoutCartBtn.addEventListener('click', () => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var cartStore = localStorage.getItem("cart");
                    var cartStoreJSON = JSON.parse(cartStore);
                    var titles = [];
                    var prices = [];
                    var ammounts = [];
                    cartStoreJSON.forEach(cart => {
                        console.log(cart);
                        titles.push(cart.title);
                        prices.push(cart.price);
                        ammounts.push(cart.ammount);
                    });
                    //  ! update || set ?

                    db.collection("CartItems").doc(user.uid).set({
                        Amount: ammounts,
                        Items: titles,
                        Price: prices
                    }).then(() => {
                        console.log('Done');
                        window.alert('Items Cheakout Done!');
                        this.hideCart();
                    });
                } else {
                    if (window.confirm('Please Login to Cheakout.')) {
                        window.location.href = './views/login.html';
                    };
                }
            });
        });
        clearCartBtn.addEventListener('click', () => {
            this.clearCart();
        });

        cartContent.addEventListener('click', event => {
            if (event.target.classList.contains('remove-item')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            } else if (event.target.classList.contains("fa-chevron-up")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id == id);
                tempItem.ammount = tempItem.ammount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.ammount;
            } else if (event.target.classList.contains("fa-chevron-down")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id == id);
                tempItem.ammount = tempItem.ammount - 1;
                if (tempItem.ammount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    addAmount.previousElementSibling.innerText = tempItem.ammount;
                } else {
                    cartContent.removeChild(addAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.ammount;
            }
        });
    }
    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }
    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id)
    }
}

// local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id)
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    ui.setupApp();
    // get all products
    products.getProducts().then(products => {
        ui.displayProducts(products)
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
        ui.cartLogic();
    });
});