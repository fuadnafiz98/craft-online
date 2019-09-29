function own(elem) {
    k = elem.getAttribute('data-id');
    getProducts().then(products => {
        console.log(k);
        console.log('dsadas');

        products.forEach(product => {
            if (product.id == k) {
                // console.log('kk');
                sessionStorage.clear();
                sessionStorage.setItem("id", k);
                // *
                localStorage.setItem("cat", product.catagory);
                console.log('kkkkk');
                location.href = "./products.html";
                //     document.getElementById('total').innerHTML = ' ';
                //     console.log(window.location);
            }
        });
    });
}

async function getProducts() {
    try {
        let result = await fetch('../products.json');
        let data = await result.json();

        let products = data.items;
        products = products.map(item => {
            const {
                title,
                price,
                catagory,
                catagory_name
            } = item.fields;
            const {
                id
            } = item.sys;
            const image = item.fields.image.fields.file.url;
            return {
                title,
                price,
                id,
                image,
                catagory,
                catagory_name
            }
        })
        return products;
    } catch (err) {
        console.log(err);
    }
}

function displayProducts(products) {
    products.forEach(product => {
        console.log(product);
    });
}