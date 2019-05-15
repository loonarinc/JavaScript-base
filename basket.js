var customerBasket = [
    {
        name: 'Брюки',
        quantity: 1,
        prise: 1499,

    },
    {
        name: 'Майка',
        quantity: 3,
        prise: 499,

    },
    {
        name: 'Рубашка',
        quantity: 2,
        prise: 799,

    },
    {
        name: 'Ремень',
        quantity: 2,
        prise: 299,
    },
]

//Стоимость корзины


function calcBasket(customerBasket) {
    var countBasketPrice = 0;
    var countBasketQuantity = 0;
    if (Object.keys(customerBasket).length !== 0) {
        for (var i = 0; i < Object.keys(customerBasket).length; i++) {
            countBasketPrice += customerBasket[i].quantity * customerBasket[i].prise;
            countBasketQuantity+=customerBasket[i].quantity;
        }
        return ("В корзине: " + countBasketQuantity +" товаров на сумму "+countBasketPrice+ " рублей");
    } else return "Корзина пуста";
}

var $basket = document.getElementById('basket');
var $titleH3 = document.createElement('h3');
$basket.appendChild($titleH3);
$titleH3.textContent = calcBasket(customerBasket);

