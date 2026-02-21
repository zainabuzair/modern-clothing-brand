// 1. Product Data (JSON Format)
const products = [
    {
        id: 1,
        name: "Classic White Tee",
        price: 29.99,
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Oversized Hoodie",
        price: 55.00,
        sizes: ["M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Slim Fit Chinos",
        price: 45.00,
        sizes: ["30", "32", "34", "36"],
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Denim Jacket",
        price: 89.00,
        sizes: ["S", "M", "L"],
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80"
    }
];

// 2. Load products into the grid
function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <div>
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
                <select id="size-${product.id}" class="size-select">
                    <option value="">Size</option>
                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                </select>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Bag</button>
        </div>
    `).join('');
}

// 3. Cart Logic using LocalStorage
function addToCart(productId) {
    const sizeElement = document.getElementById(`size-${productId}`);
    const selectedSize = sizeElement.value;

    if (!selectedSize) {
        alert("Please select a size first!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the exact same item AND size exists
    const existingItem = cart.find(item => item.id === productId && item.size === selectedSize);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, size: selectedSize, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Visual feedback
    sizeElement.value = ""; // Reset dropdown
    alert(`Added size ${selectedSize} to your bag!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Sum up all quantities
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = `Cart (${totalItems})`;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').innerText = `Cart (${cart.length})`;
}

// Function to render items on the Cart Page
function displayCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const totalDisplay = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your bag is empty.</p>";
        totalDisplay.innerText = "Total: $0.00";
        return;
    }

    let total = 0;
    cartContainer.innerHTML = cart.map(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        const itemTotal = product.price * cartItem.quantity;
        total += itemTotal;

        return `
            <div class="cart-row" style="display: flex; align-items: center; padding: 20px 0; border-bottom: 1px solid #eee;">
                <img src="${product.image}" style="width: 100px; height: 120px; object-object-fit: cover;">
                
                <div style="flex: 2; margin-left: 20px;">
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)}</p>
                    <p style="font-size: 0.8rem; color: #757575;">Size: ${cartItem.size}</p>
                </div>

                <div class="quantity-controls" style="display: flex; align-items: center; gap: 15px; flex: 1;">
                    <button onclick="changeQuantity(${product.id}, -1)" style="cursor:pointer; padding: 5px 10px;">-</button>
                    <span>${cartItem.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, 1)" style="cursor:pointer; padding: 5px 10px;">+</button>
                </div>

                <div style="flex: 1; text-align: right; font-weight: bold;">
                    $${itemTotal.toFixed(2)}
                </div>
            </div>
        `;
    }).join('');

    totalDisplay.innerText = `Total: $${total.toFixed(2)}`;
}

function changeQuantity(productId, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += delta;

        // If quantity drops to 0, remove the item
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh the list
    updateCartCount(); // Refresh the nav count
}

// Clear Cart Function
function clearCart() {
    localStorage.removeItem('cart');
    location.reload(); // Refresh page to show empty cart
}

// Checkout Simulation
function processCheckout() {
    if (confirm("Proceed to pay and complete your order?")) {
        // Here you would typically use SessionStorage for guest info
        sessionStorage.setItem('orderStatus', 'Success');
        alert("Order Placed Successfully!");
        clearCart();
        window.location.href = "index.html";
    }
}

// Initialize on page load
window.onload = () => {
    displayProducts();
    updateCartCount();
};

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            // 1. Name Validation
            if (name.value.trim().length < 2) {
                showError(name, "Please enter your full name.");
                isValid = false;
            } else {
                clearError(name);
            }

            // 2. Email Validation (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError(email, "Please enter a valid email address.");
                isValid = false;
            } else {
                clearError(email);
            }

            // 3. Message Validation
            if (message.value.trim().length < 10) {
                showError(message, "Message must be at least 10 characters long.");
                isValid = false;
            } else {
                clearError(message);
            }

            // If all good, simulate sending
            if (isValid) {
                contactForm.style.display = 'none';
                document.getElementById('form-success').style.display = 'block';
                
                // Store submission in SessionStorage for proof of concept
                sessionStorage.setItem('lastContact', new Date().toISOString());
            }
        });
    }
});

function showError(input, msg) {
    input.classList.add('invalid');
    input.nextElementSibling.innerText = msg;
}

function clearError(input) {
    input.classList.remove('invalid');
    input.nextElementSibling.innerText = "";
}
        