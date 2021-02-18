if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', checkReady)
} else {
    checkReady();
}
function checkReady(){
    const removeCartItembuttons = document.querySelectorAll('.btn-danger');
    // console.log(removeCartItembuttons);
    removeCartItembuttons.forEach(function (btn){
        btn.addEventListener("click", removeCartItem);
    });
    const quantityInputs = document.querySelectorAll('.cartQuantityInput');
    quantityInputs.forEach(function (quantityInput){
    
    quantityInput.addEventListener('change',quantityChanged);
    });
    const addtoCartbtn = document.querySelectorAll('.addtoCartbtn');
    addtoCartbtn.forEach(function (elem){
    
    elem.addEventListener('click',addtoCart);
});

    const btnPurchase = document.getElementById('btn-purchase');
    btnPurchase.addEventListener('click', purchaseBtnClicked); 

}


function removeCartItem(e){
    const buttonClicked = e.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
}

function updateCartTotal(){
    const cartItemContainer = document.getElementsByClassName('cartItems')[0];
    const cartrows = cartItemContainer.querySelectorAll('.cart-row');
    let total =0;
    cartrows.forEach(function(elem){
        const cartrow = elem;
        const priceElement = cartrow.getElementsByClassName('cartPrice')[0];
        const quantityElement = cartrow.getElementsByClassName('cartQuantityInput')[0];
        const price = parseFloat(priceElement.innerText.replace('$',''));
        const quantity = quantityElement.value;
        /* console.log(quantity)
        console.log(price * quantity); */
        total = total + (price*quantity)
    })
    total = Math.round(total*100)/100;
    document.getElementById('cartTotalPrice').innerText = `$${total}`;
}

function addtoCart(event)
{
    const button = event.target;
    const shopItem = button.parentElement.parentElement;
    const title = shopItem.getElementsByClassName('itemTitle')[0].innerText;
    const price = shopItem.getElementsByClassName('itemPrice')[0].innerText;
    const imageSrc = shopItem.getElementsByClassName('itemImage')[0].src;
    //console.log(title,price,imageSrc);
    additemToCart(title,price,imageSrc);
    updateCartTotal();
}

function additemToCart(title,price,imageSrc){
    const cartRow = document.createElement('div');
    const cartItems = document.getElementsByClassName('cartItems')[0];
    const cartItemNames = document.getElementsByClassName('cartItem-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    const cartRowNew = `
            <div class="cartItem cart-col">
                <img src="${imageSrc}"class="cartItem-image" alt="carrotCake">
                <span class="cartItem-title">${title}</span>
            </div>
            <span class="cartPrice cart-col">${price}</span>
            <div class="cartQuantity cart-col">
                <input type="number" class="cartQuantityInput" value="1" min="1">
                <button role="button" class="btn-danger btn">Remove</button>
            </div>`
    cartRow.innerHTML = cartRowNew;
    cartRow.classList.add('cart-row');
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cartQuantityInput')[0].addEventListener('change', quantityChanged)

}


function quantityChanged(event){
    const input = event.target;
    if(isNaN(input.value)||input.value <=0)
    {
        input.value = 1;
    }
    updateCartTotal();

}

function purchaseBtnClicked(){
   const cartItems = document.getElementsByClassName('cartItems')[0];
   if(cartItems.innerHTML == ''){
      alert('There is no items in the cart.Please add.');
   }
   else{
    alert('Thank you for your purchase');
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
   }

}










