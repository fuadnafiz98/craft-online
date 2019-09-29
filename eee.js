
console.log(sessionStorage.getItem("id"));

getProducts().then(products => {
    console.log('in eee.js');

    products.forEach(product => {
        if (product.id == sessionStorage.getItem("id")) {
            console.log(product);
            // sessionStorage.clear();
            document.getElementById('main-product').innerHTML =
                `
        <div class="row mar-top">
            <div class="col-md-4"></div>
            <div class="col-md-4 mr-3">
                <h1>Product-Details</h1>
            </div>
            <div class="col-md-2"></div>
        </div>
        <div class="row mt-4">
            <div class="col-md-4">
                <nav aria-label="breadcrumb bg-white ">
                    <ol class="breadcrumb bg-white ">
                        <li class="breadcrumb-item"><a class="text-muted" href=" #">Catagories</a></li>
                        <li class="breadcrumb-item"><a class="text-muted" href="catagory.html">${product.catagory_name}</a></li>
                        <li class="breadcrumb-item active text-dark" aria-current="page">${product.title}</li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-4 mr-3">
            </div>
            <div class="col-md-2"></div>
        </div>

        <div class="row mt-4">
            <div class="col-md-8">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${'.' + product.image}" alt="pro-img"
                                class="d-block w-100 pro-img z-depth-2">
                            <!-- <img src="..." class="d-block w-100" alt="..."> -->
                        </div>
                        <div class="carousel-item">
                            <img src="${'.' + product.image}" alt="pro-img"
                                class="d-block w-100 pro-img z-depth-2">
                        </div>
                        <div class="carousel-item">
                            <img src="${'.' + product.image}" alt="pro-img"
                                class="d-block w-100 pro-img z-depth-2">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div class="col-md-4">
                <h2>${product.title}</h2>
                <h6>Product Id : ${product.title}-${product.id}</h6>
                <div class="row mt-4">
                    <div class="col-2 mr-3">
                        <h5>Review:</h5>
                    </div>
                    <div class="col md-2 mr-4">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span><br>
                    </div>
                    <div class="col md-8"></div>
                </div>
                <h1 class="mt-4">${product.price}$</h1><br>
                <button type="button" class="btn btn-lg btn-dark btn-space">Buy Now</button>
                <button type="button" class="btn btn-lg btn-dark btn-space">Add to Cart</button>
                <div class="row mt-5">
                        <h4 class="ml-3 mt-2">Pay With</h4>
                        <div class="col md-2 mr-4">
                            <a href="#" class="payment fab fa-cc-visa ml-2"></a>
                            <a href="#" class="payment fab fa-cc-mastercard ml-4"></a>
                            <a href="#" class="payment fab fa-paypal ml-4"></a>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <h3 class="ml-3 mt-2">Share</h3>
                        <div class="col md-2 mr-4">
                            <a href="#" class="social-icons fab fa-facebook mr-2"></a>
                            <a href="#" class="social-icons fab fa-twitter mr-2"></a>
                            <a href="#" class="social-icons fab fa-instagram mr-2"></a>
                            <a href="#" class="social-icons fab fa-pinterest mr-2"></a>
                        </div>
                </div>
            </div>
        </div>
        
        `;
            // console.log(document.getElementById('total').innerHTML);

            document.getElementById("Discription").innerHTML = product.discription;
            document.getElementById("Additional-Information").innerHTML = product.additional_discription;
        }
    });
});

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
                catagory_name,
                discription,
                additional_discription,
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
                catagory_name,
                discription,
                additional_discription
            }
        })
        return products;
    } catch (err) {
        console.log(err);
    }
}
