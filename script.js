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
       Add to cart
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
            <span class="goods-item-price txt">${this.price} $</span>
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