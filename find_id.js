var k;

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
                console.log('kkkkk');
                location.href = "../views/products.html";
                //     document.getElementById('total').innerHTML = ' ';
                //     console.log(window.location);
            }
        });
    });
}
//var opened = window.open("");
//opened.location.assign('./views/products.html');
//                 opened.document.write(`

//         <!DOCTYPE html>
//           <html lang="en">

//           <head>
//             <meta charset="UTF-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//             <meta http-equiv="X-UA-Compatible" content="ie=edge" />

//             <link rel="stylesheet" href="../css/products.css" />
//             <title>Craft Online</title>

//             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
//               integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
//             <link href="https://fonts.googleapis.com/css?family=Poppins:400&display=swap" rel="stylesheet" />
//             <script src="https://kit.fontawesome.com/0b0f4c8001.js"></script>

//             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
//           </head>

//           </html>

//           <header>
//             <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light">
//               <div class="container justify-content-center">
//                 <ul class="nav navbar-nav flex-fill justify-content-center">
//                   <li class="nav-item active"><a class="nav-link" id="logo" href="#">Crafts Online</a></li>
//                 </ul>
//                 <ul class="nav navbar-nav mar-right">
//                   <li class="nav-item">
//                     <a class="nav-link" href="index.html">Home</a>
//                   </li>
//                   <li class="nav-item"></li>
//                   <li class="nav-item dropdown">
//                     <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
//                       aria-expanded="false">Catagories
//                     </a>
//                     <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//                       <a class="dropdown-item" href="#">1st Catagory</a>
//                       <a class="dropdown-item" href="#">2nd Catagory</a>
//                       <a class="dropdown-item" href="#">3rd Catagory</a>
//                       <a class="dropdown-item" href="#">4th Catagory</a>
//                       <a class="dropdown-item" href="#">5th Catagory</a>
//                     </div>
//                   </li>
//                   <li class="nav-item">
//                     <a class="nav-link" href="#">About</a>
//                   </li>
//                 </ul>

//                 <ul class="nav navbar-nav">
//                   <li class="nav-item dropdown">
//                     <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
//                       aria-expanded="false"><i class="fas fa-user"></i>
//                     </a>
//                     <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//                       <a class="dropdown-item" href="#">My Account</a>
//                       <a class="dropdown-item" href="#">Account Settings</a>
//                       <div class="dropdown-divider"></div>
//                       <a class="dropdown-item" href="./views/login.html">Sign in/log out</a>
//                     </div>
//                   </li>

//                   <li class="nav-item dropdown">
//                     <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
//                       aria-expanded="false"><i class="fas fa-search"></i>
//                     </a>
//                     <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//                       <a class="dropdown-item" href="#">
//                         <!-- <form class="form-inline"> -->
//                         <input class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search">
//                         <!-- </form> -->
//                       </a>
//                     </div>
//                   </li>
//                   <li class="nav-item">
//                     <button type="button" class="btn btn-light"> <i class="fas fa-shopping-cart"></i> </button>
//                   </li>
//                 </ul>
//               </div>
//             </nav>
//           </header>



//           <body>

//             <div class="container" id="main-product">

//               <div class="row mar-top">
//                 <div class="col-md-4"></div>
//                 <div class="col-md-4 mr-3">
//                   <h1>Product-Details</h1>
//                 </div>
//                 <div class="col-md-2"></div>
//               </div>
//               <div class="row mt-4">
//                 <div class="col-md-4">
//                   <nav aria-label="breadcrumb bg-white ">
//                     <ol class="breadcrumb bg-white ">
//                       <li class="breadcrumb-item"><a class="text-muted" href=" #">Catagories</a></li>
//                       <li class="breadcrumb-item"><a class="text-muted" href="#">Product</a></li>
//                       <li class="breadcrumb-item active text-dark" aria-current="page">${product.title}</li>
//                     </ol>
//                   </nav>
//                 </div>
//                 <div class="col-md-4 mr-3">
//                 </div>
//                 <div class="col-md-2"></div>
//               </div>

//               <div class="row mt-4">
//                 <div class="col-md-8">
//                   <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
//                     <ol class="carousel-indicators">
//                       <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
//                       <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//                       <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//                     </ol>
//                     <div class="carousel-inner">
//                       <div class="carousel-item active">
//                         <img src="${product.image}" alt="pro-img"
//                           class="d-block w-100 pro-img z-depth-2">
//                         <!-- <img src="..." class="d-block w-100" alt="..."> -->
//                       </div>
//                       <div class="carousel-item">
//                         <img src="${product.image}" alt="pro-img"
//                           class="d-block w-100 pro-img z-depth-2">
//                       </div>
//                       <div class="carousel-item">
//                         <img src="${product.image}" alt="pro-img"
//                           class="d-block w-100 pro-img z-depth-2">
//                       </div>
//                     </div>
//                     <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//                       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                       <span class="sr-only">Previous</span>
//                     </a>
//                     <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//                       <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                       <span class="sr-only">Next</span>
//                     </a>
//                   </div>
//                 </div>
//                 <div class="col-md-4">
//                   <h2>${product.title}</h2>
//                   <h6>Product Id : ${product.title}-${product.id}</h6>
//                   <div class="row mt-4">
//                     <div class="col-2 mr-3">
//                       <h5>Review:</h5>
//                     </div>
//                     <div class="col md-2 mr-4">
//                       <span class="fa fa-star checked"></span>
//                       <span class="fa fa-star checked"></span>
//                       <span class="fa fa-star checked"></span>
//                       <span class="fa fa-star"></span>
//                       <span class="fa fa-star"></span><br>
//                     </div>
//                     <div class="col md-8"></div>
//                   </div>
//                   <h1 class="mt-4">${product.price}$</h1><br>
//                   <button type="button" class="btn btn-lg btn-dark btn-space">Buy Now</button>
//                   <button type="button" class="btn btn-lg btn-dark btn-space">Add to Cart</button>
//                 </div>
//               </div>

//               <div class="row mt-4">
//                 <div class="col mt-4">
//                   <ul class="nav nav-tabs" id="myTab" role="tablist">
//                     <li class="nav-item">
//                       <a class="nav-link active" id="Discription-tab" data-toggle="tab" href="#Discription" role="tab"
//                         aria-controls="Discription" aria-selected="true">Discription</a>
//                     </li>
//                     <li class="nav-item">
//                       <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
//                         aria-selected="false">Profile</a>
//                     </li>
//                     <li class="nav-item">
//                       <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact"
//                         aria-selected="false">Contact</a>
//                     </li>
//                   </ul>
//                   <div class="tab-content" id="myTabContent">
//                     <div class="tab-pane fade show active" id="Discription" role="tabpanel" aria-labelledby="Discription-tab">
//                       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos cupiditate saepe eos nostrum, odit
//                       sunt suscipit adipisci reprehenderit, doloribus amet autem aliquam. Commodi velit autem corporis. Beatae
//                       asperiores sapiente, est expedita eligendi accusamus debitis labore, sint ducimus molestiae aut! Eaque
//                       delectus quam rerum reiciendis deserunt beatae impedit illum quia voluptates.
//                     </div>
//                     <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Lorem, ipsum dolor sit
//                       amet consectetur adipisicing elit. Distinctio, labore excepturi! Sint tenetur porro veniam dolore maxime
//                       culpa nemo repellendus!</div>
//                     <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
//                       <!-- st -->

//                       <div class="container">
//                       <div class="row">
//                         <!-- add comment -->
//                         <div class="col">
//                           <div class="row bootstrap snippets">
//                             <div class="col-md-6 col-md-offset-2 col-lg-12">
//                               <div class="comment-wrapper">
//                                 <div class="panel panel-info">
//                                   <div class="panel-body">
//                                     <textarea class="form-control" placeholder="write a comment..." rows="3"
//                                       id="comment-section"></textarea>
//                                     <br>
//                                     <button type="button" class="btn btn-info pull-right" id="btn">Post</button>
//                                     <div class="clearfix"></div>
//                                     <hr>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <!-- add comment End-->
//                       </div>
//                       <div class="wrapper" id="ok">

//                       </div>
//                     </div>

//                       <!-- ed -->
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <footer>
//                 <p>Craft Online &copy; 2019</p>
//               </footer>

//               <script src="../product.js"></script>
//               <script src="../comments.js"></script>

//               <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
//               <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
//               <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
//                 integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
//               </script>

//               <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
//                 integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
//               </script>
//               <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
//                 integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
//               </script>


//           </body>


//                         `);
//             }
//         })
//     });
// }
async function getProducts() {
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

function displayProducts(products) {
    products.forEach(product => {
        console.log(product);
    });
}