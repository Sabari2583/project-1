// Function to add product to cart
function addToCart(event) {
    let product = event.target.closest('.p1'); // Find the product container
    let name = product.querySelector('h2').innerText;
    let price = product.querySelector('h1').innerText;
    let image = product.querySelector('img').src;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.name === name && item.price === price); // Ensure same name and price

    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if it's already in the cart
    } else {
        cart.push({ name, price, image, quantity: 1 }); // Add a new entry if not in the cart
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
}

// Function to display cart items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTable = document.querySelector('.by1');
    cartTable.innerHTML = '';

    cart.forEach((item, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><i class="far fa-times-circle" onclick="removeFromCart(${index})"></i></td>
            <td><img src="${item.image}" width="50"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</td>
        `;
        cartTable.appendChild(row);
    });
}

// Function to remove an item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Function to update quantity
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}
// Function to display cart items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTable = document.querySelector('.by1');
    cartTable.innerHTML = '';

    let totalPrice = 0; // Initialize total price

    cart.forEach((item, index) => {
        let row = document.createElement('tr');
        let itemTotalPrice = parseFloat(item.price.replace('$', '')) * item.quantity; // Calculate item total price
        totalPrice += itemTotalPrice; // Add item total to the total price

        row.innerHTML = `
            <td><i class="far fa-times-circle" onclick="removeFromCart(${index})"></i></td>
            <td><img src="${item.image}" width="50"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>$${itemTotalPrice.toFixed(2)}</td>
        `;
        cartTable.appendChild(row);
    });

    // Display total price in the cart
    let totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="5" style="text-align:right;">Total Price:</td>
        <td>$${totalPrice.toFixed(2)}</td>
    `;
    cartTable.appendChild(totalRow);
}

// Function to update quantity
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}


// Attach event listeners for adding to cart on shop page
document.addEventListener('DOMContentLoaded', function () {
    let addToCartButtons = document.querySelectorAll('.s1 i');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    if (document.querySelector('.by1')) {
        displayCart();
    }
});
