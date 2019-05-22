var product = [
    {
        name: 'Брюки',
        img: ['img/mini_bruki.jpg', 'img/mini_bruki2.jpg'],
        large: ['img/bruki.jpg', 'img/bruki2.jpg'],
        article: 1001,
        price: 1499,
        quantity: 0,

    },
    {
        name: 'Майка',
        img: ['img/mini_maika.jpg'],
        large: ['img/maika.jpg'],
        article: 2001,
        price: 499,
        quantity: 0,

    },
    {
        name: 'Рубашка',
        img: ['img/mini_rub.jpg'],
        large: ['img/rub.jpg'],
        article: 3001,
        price: 799,
        quantity: 0,

    },
    {
        name: 'Ремень',
        img: ['img/mini_remen.jpg'],
        large: ['img/remen.jpg'],
        article: 4001,
        price: 299,
        quantity: 0,
    },
];
var customerCart = [];

function showCatalog(product, $child) {
    var $catalog = document.getElementById('catalog');
    $catalog.textContent = '';
    if (product.length !== 0) {
        for (var i = 0; i < product.length; i++) {
            var $cloneDiv = document.createElement('div');
            $child.appendChild($cloneDiv);
            $cloneDiv.setAttribute('id', 'product_' + product[i].article);
            $cloneDiv.dataset.number = i + 1;
            var $copyP = document.createElement('p');
            var $cloneP = $copyP.cloneNode(true);
            var $button = document.createElement('button');
            $cloneDiv.appendChild($cloneP);
            $cloneP.textContent = product[i].name;
            var $img = document.createElement('img');
            $cloneDiv.appendChild($img);
            $img.setAttribute('src', product[i].img[0]);
            $img.setAttribute('id', 'mini_img');
            $cloneP = $copyP.cloneNode(true);
            $cloneDiv.appendChild($cloneP);
            $cloneP.textContent = 'Артикул: ' + product[i].article;
            $cloneP = $copyP.cloneNode(true);
            $cloneDiv.appendChild($cloneP);
            $cloneP.textContent = 'Цена: ' + product[i].price + ' р.';
            $cloneDiv.appendChild($button);
            $button.textContent = toCartOutCart(product[i]);
            $button.setAttribute('id', 'addTo_' + product[i].article);
        }
        return true;
    } else return false;
}

function showCart() {
    var $cart = document.getElementById('cart');
    var $cartTitle = document.createElement('h3');
    var $nextButton = document.createElement('button');
    $nextButton.textContent = 'Далее';
    $nextButton.setAttribute('id', 'nextButtonCart');
    $cart.textContent = '';
    $cartTitle.textContent = 'Состав корзины:';
    if (customerCart.length !== 0) {
        $cart.appendChild($cartTitle);
    }

    for (i = 0; i < customerCart.length; i++) {
        var $purchases = document.createElement('div');
        $purchases.dataset.number = i;
        $purchases.classList.add('purchases');
        var $name = document.createElement('p');
        $name.textContent = customerCart[i].name;
        var $price = document.createElement('p');
        $price.textContent = customerCart[i].price;
        var $remButton = document.createElement('button');
        $remButton.textContent = 'Remove';
        var $quantity_wrap = document.createElement('div');
        var $minus = document.createElement('button');
        $minus.textContent = '-';
        var $quantity = document.createElement('input');
        $quantity.type = 'number';
        $quantity.step = '1';
        $quantity.min = '1';
        $quantity.value = customerCart[i].quantity;
        var $plus = document.createElement('button');
        $plus.textContent = '+';
        $quantity_wrap.appendChild($minus);
        $quantity_wrap.appendChild($quantity);
        $quantity_wrap.appendChild($plus);
        var $subtotal = document.createElement('p');
        $subtotal.textContent = (customerCart[i].price * customerCart[i].quantity);
        $purchases.appendChild($name);
        $purchases.appendChild($price);
        $purchases.appendChild($quantity_wrap);
        $purchases.appendChild($subtotal);
        $purchases.appendChild($remButton);
        $cart.appendChild($purchases);
    }
    var $totalCartPrice = document.createElement('p');
    $totalCartPrice.textContent = calcCart(customerCart);
    $cart.appendChild($totalCartPrice);
    if (customerCart.length !== 0) {
        $cart.appendChild($nextButton);
    }
}



function handleButtonClick(event) {
    if (event.target.textContent == 'Add to Cart') {
        addToCart(product[event.target.parentNode.dataset.number - 1]);
        init();
    }
    if (event.target.textContent == 'Remove') {
        customerCart.splice(event.target.parentNode.dataset.number, 1);
        init();
    }
    if (event.target.getAttribute('id') == 'mini_img') {
        var $modal = document.getElementById('myModal');
        var $large_img = document.getElementById('large_img');
        var $img = document.createElement('img');
        $img.setAttribute('id', 'large');
        //console.log($img);
        $large_img.textContent = '';
        $large_img.appendChild($img);
        $img.setAttribute('src', product[event.target.parentNode.dataset.number - 1].large[0]);
        $img.dataset.number = product[event.target.parentNode.dataset.number - 1].large.length;
        $modal.style.display = 'block';
        init();
    }
    if (event.target.tagName == 'SPAN') {
        var $modal = document.getElementById('myModal');
        $modal.style.display = 'none';
        init();
    }
    if (event.target.getAttribute('id') == 'large') {
        //не доделано

    }
    if (event.target.getAttribute('id') == 'nextButtonCart') {
        var $cart = document.getElementById('cart');
        var $address = document.getElementById('address');
        $cart.style.display = 'none';
        $address.style.display = 'block';

    }
    if (event.target.getAttribute('id') == 'nextButtonAddress') {
        var $addressArea = document.getElementById('addressArea');
        console.log($addressArea.value);
        var $address = document.getElementById('address');
        var $comment = document.getElementById('comment');
        if ($addressArea.value !== '') {
            $address.style.display = 'none';
            $comment.style.display = 'block';
        } else
            alert('Вы не ввели адрес');
    }
    if (event.target.getAttribute('id') == 'nextButtonComment') {
        alert('Ваш заказ принят в обработку');
        window.location.reload();
    }
    if (event.target.textContent == '+') {
        customerCart[event.target.parentNode.parentNode.dataset.number].quantity++;
        init();
    }
    if (event.target.textContent == '-' && customerCart[event.target.parentNode.parentNode.dataset.number].quantity > 1) {
        customerCart[event.target.parentNode.parentNode.dataset.number].quantity--;
        init();
    }
}


function addToCart(product) {
    for (var i = 0; i < customerCart.length; i++) {
        if (customerCart[i].name == product.name) {
            return;
        }
    }
    product.quantity = 1;
    customerCart.push(product);
}

function toCartOutCart(product) {
    for (var i = 0; i < customerCart.length; i++) {
        if (customerCart[i].name == product.name)
            return 'In Cart';
    }
    return 'Add to Cart'
}

function calcCart(customerCart) {
    var countCartPrice = 0;
    var countCartQuantity = 0;
    if (customerCart.length !== 0) {
        for (var i = 0; i < customerCart.length; i++) {
            countCartPrice += customerCart[i].quantity * customerCart[i].price;
            countCartQuantity += customerCart[i].quantity;
        }
        return ('В корзине: ' + countCartQuantity + ' товаров на сумму ' + countCartPrice + ' рублей');
    } else return 'Корзина пуста';
}

var $cart = document.getElementById('cart');
var $title = document.createElement('h3');
$cart.appendChild($title);
$title.textContent = calcCart(customerCart);


function init() {
    var $catalog = document.getElementById('catalog');
    showCatalog(product, $catalog);
    showCart();
    var $product = document.querySelector('body');
    $product.addEventListener('click', handleButtonClick);
    console.log($product);
}

window.addEventListener('load', init);
