var product = [
    {
        name: 'Брюки',
        article: 1001,
        prise: 1499,

    },
    {
        name: 'Майка',
        article: 2001,
        prise: 499,

    },
    {
        name: 'Рубашка',
        article: 3001,
        prise: 799,

    },
    {
        name: 'Ремень',
        article: 4001,
        prise: 299,
    },
]

function showCatalog(product, $child) {
    if (Object.keys(product).length !== 0) {
        for (var i = 0; i < Object.keys(product).length; i++) {
            var $cloneDiv = document.createElement('div');
            $child.appendChild($cloneDiv);
            $cloneDiv.setAttribute("id", "product_"+product[i].article);
            var $copyP = document.createElement('p');
            var $cloneP = $copyP.cloneNode(true);
            $cloneDiv.appendChild($cloneP);
            $cloneP.textContent=product[i].name;
            $cloneP = $copyP.cloneNode(true);
            $cloneDiv.appendChild($cloneP);
            $cloneP.textContent="Артикул: "+product[i].article;
            $cloneP = $copyP.cloneNode(true);
            $cloneDiv.appendChild($cloneP);
            $cloneP.textContent="Цена: " + product[i].prise+" р.";

        }
        return true;
    } else return false;
}

var $catalog = document.getElementById('catalog');
showCatalog(product, $catalog);
