const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
var btnBasket = document.getElementById('cart-icon');
var goodsListSection = document.getElementById('goods-list-section');
var btnOrder = document.getElementsByClassName('product-card-section_btn-order');

/* Решение задания 1.
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error!');
                } else {
                    resolve(xhr.responseText);
                }
            }
        }
        xhr.send();
    })
}*/


//метод возвращает html-разметку
const renderCartItem = (title, price, description, src = 'image/default.png') => { //установил значения по умолчанию если не задать картинку то будет взята по умолчанию
    return `<a class="goods-item">
    <div class="goods-item-photo-wrp">
        <img class="goods-item-photo" src=${src} alt='${title}' height="420">
    </div>
    <div class="goods-item-txt-wrp">
        <span class="goods-item-title txt">${title}</span>
        <p class="goods-item-txt txt">${description}</p>
        <span class="goods-item-price txt">${price}</span>
    </div>
    <button class="cart-button txt product-card-section_btn-order" data-product-name="${title}" onclick="addItemToCart()">
        <svg width="27" height="25" viewBox="0 0 27 25" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.876 22.2662C21.921 22.2549 21.9423 22.2339 21.96 22.2129C21.9678 22.2037 21.9756 22.1946 21.9835 22.1855C22.02 22.1438 22.0233 22.0553 22.0224 22.0105C22.0092 21.9044 21.9185 21.8315 21.8412 21.8315C21.8375 21.8315 21.8336 21.8317 21.8312 21.8318C21.7531 21.8372 21.6653 21.9409 21.6719 22.0625C21.6813 22.1793 21.7675 22.2662 21.8392 22.2662H21.876ZM8.21954 22.2599C8.31873 22.2599 8.39935 22.1655 8.39935 22.0496C8.39935 21.9341 8.31873 21.8401 8.21954 21.8401C8.12042 21.8401 8.03973 21.9341 8.03973 22.0496C8.03973 22.1655 8.12042 22.2599 8.21954 22.2599ZM21.9995 24.2662C21.9517 24.2662 21.8878 24.2662 21.8392 24.2662C20.7017 24.2662 19.7567 23.3545 19.6765 22.198C19.5964 20.9929 20.4937 19.9183 21.6953 19.8364C21.7441 19.8331 21.7928 19.8315 21.8412 19.8315C22.9799 19.8315 23.9413 20.7324 24.019 21.8884C24.0505 22.4915 23.8741 23.0612 23.4898 23.5012C23.1055 23.9575 22.5764 24.2177 21.9995 24.2662ZM8.21954 24.2599C7.01532 24.2599 6.03973 23.2709 6.03973 22.0496C6.03973 20.8291 7.01532 19.8401 8.21954 19.8401C9.42371 19.8401 10.3994 20.8291 10.3994 22.0496C10.3994 23.2709 9.42371 24.2599 8.21954 24.2599ZM21.1984 17.3938H9.13306C8.70013 17.3938 8.31586 17.1005 8.20331 16.6775L4.27753 2.24768H1.52173C0.993408 2.24768 0.560547 1.80859 0.560547 1.27039C0.560547 0.733032 0.993408 0.292969 1.52173 0.292969H4.99933C5.43134 0.292969 5.81561 0.586304 5.9281 1.01025L9.85394 15.4391H20.5576L24.1144 7.13379H12.2578C11.7286 7.13379 11.2957 6.69373 11.2957 6.15649C11.2957 5.61914 11.7286 5.17908 12.2578 5.17908H25.5886C25.9091 5.17908 26.2141 5.34192 26.3896 5.61914C26.566 5.89539 26.5984 6.23743 26.4697 6.547L22.0795 16.807C21.9193 17.1653 21.5827 17.3938 21.1984 17.3938Z" />
        </svg>
        <span>Add to Cart</span>
    </button>
    </a>`;
};
//метод для заполнения списка goods. 
const goods = [
    { title: 'Shirt', description: 'Quality Shirt', price: 150 + '$', src: 'image/featured1.png' },
    { title: 'Socks', description: 'Quality Socks', price: 50 + '$', src: 'image/featured2.png' },
    { title: 'Jacket', description: 'Quality Jacket', price: 350 + '$', src: 'image/featured3.png' },
    { title: 'Shoes', description: 'Quality Shoes', price: 250 + '$', src: 'image/featured4.png' },
];

const renderGoodsList = list => {
    let goodsList = list.map(item => renderCartItem(item.title, item.price, item.description, item.src));
    document.querySelector('.goods-list').innerHTML = goodsList.join(''); // убрал , т.к возвращало массив и разделяло , 
}

//альтернативный вариант
/*const renderGoodsList = list => list.forEach(el => document.querySelector('.goods-list')
    .insertAdjacentHTML('beforeend', renderCartItem(el.title, el.description, el.price, el.src)));*/



var allProducts = {
    Shirt: { title: 'Shirt', price: 150, src: 'image/featured1.png' },
    Socks: { title: 'Socks', price: 50, src: 'image/featured2.png' },
    Jacket: { title: 'Jacket', price: 350, src: 'image/featured3.png' },
    Shoes: { title: 'Shoes', price: 250, src: 'image/featured4.png' },
};

class CartItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.src = product.src;
        this.quantity = 1;
    }

    //Разметка корзины
    renderWithindex(index) {
        return `<div><a class="goods-item">
        <div class="goods-item-photo-wrp">
            <img class="goods-item-photo"src=${this.src} alt='${this.title}' height="420">
        </div>
        <div class="goods-item-txt-wrp">
            <span class="goods-item-title txt">${this.title}</span>
            <p class="goods-item-txt txt">${this.description}</p>
            <span class="goods-item-price txt">${this.price}</span>
        </div>
        <div class="goods-list__product-box__quantity">Amount: ${this.quantity}</div>
        <input type="submit" value="X" class="goods-list-item__product-box__delete" data-product-index=${index} onclick="deleteItemFromCart()">
        </a>
       
        </div>`
    }
    addQuantity() {
        this.quantity += 1;
    }
}


class Cart {
    constructor() {
        this.goods = [];
    }
    render() {
        let listHtml = '';
        let goodsList = document.getElementById('goods-list__product-box');

        this.goods.forEach((cartItem, indexOfProduct) => {
            listHtml += cartItem.renderWithindex(indexOfProduct);
        });
        goodsList.innerHTML = listHtml;

        this.totalCartPrice();
    }
    //Добавляем товар в корзину
    addItemToCart(product) {
        let cartItem = this.goods.filter(el => el.title == product.title)[0]

        if (cartItem != undefined) {
            cartItem.addQuantity();
        } else {
            let item = new CartItem(product);
            this.goods.push(item);
        }
    }
    //Вывод итоговой суммы корзины
    totalCartPrice() {
        let totalPrice = document.getElementById('goods-list__total');
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price * good.quantity;
        });
        totalPrice.innerText = `Total amount is ${sum} $ `;
    }
    deleteItemFromCart(index) {
        this.goods.splice(index, 1);
        this.render();
    }


}

const addItemToCart = () => {
    let productName = event.target.dataset.productName;
    let product = allProducts[productName];
    cart.addItemToCart(product);
}

const deleteItemFromCart = () => {
    let index = event.target.dataset.productIndex;
    cart.deleteItemFromCart(index);
}

var renderCart = () => {
    cart.render();
    goodsListSection.style.display = 'block';
};

var cart = new Cart();

renderGoodsList(goods);
btnBasket.addEventListener('click', renderCart);
document.querySelectorAll('.goods-list-section__delete')[0].addEventListener('click', function () {
    document.getElementById('goods-list-section').style.display = 'none';
});
window.addEventListener('click', function (evt) { console.log(evt) });