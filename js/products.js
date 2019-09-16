"use strict";
document.getElementById('btn').addEventListener('click', clicked);
function clicked() {
    var input_value = document.getElementById('comment-section').value;
    console.log(input_value);
    let result = '';
    result += `
    <div class="media comment-box mt-4">
      <div class="media-left">
        <a href="#">
          <img class="img-fluid user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">John Doe</h4>
        <p>${input_value}</p>
      </div>
    </div>
    `;
    const productsDom = document.getElementById("ok");
    console.log(productsDom);
    productsDom.innerHTML = result;
    document.getElementById('comment-section').reset();
}
