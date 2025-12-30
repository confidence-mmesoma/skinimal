const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

// Toggle menu
hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
});

// Close menu on nav link click
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("active")) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove("active");
        }
    }
});

// add to carth
const cartIcon = document.getElementById("cartIcon");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

let cartData = [];

// Toggle cart
cartIcon.addEventListener("click", () => {
    cart.classList.toggle("active");
});

// Add to cart
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        cartData.push({ name, price });
        updateCart();
    });
});

// Update cart UI
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cartData.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <button onclick="removeItem(${index})">✕</button>
      </div>
    `;
    });

    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = cartData.length;
}

document.querySelector(".checkout-btn").addEventListener("click", () => {
    document.getElementById("cart").classList.remove("active");
});

document.addEventListener("click", (e) => {
    const cart = document.getElementById("cart");
    const cartIcon = document.getElementById("cartIcon");

    if (
        cart.classList.contains("active") &&
        !cart.contains(e.target) &&
        !cartIcon.contains(e.target)
    ) {
        cart.classList.remove("active");
    }
});


// Remove item
function removeItem(index) {
    cartData.splice(index, 1);
    updateCart();
}


document.querySelector(".checkout-btn").addEventListener("click", () => {
    let message = "Hello Skinimal, I want to order:\n";

    cartData.forEach(item => {
        message += `- ${item.name}\n`;
    });

    message += `Total: ₦${cartTotal.textContent}`;

    window.open(
        `https://wa.me/2348000000000?text=${encodeURIComponent(message)}`
    );
});



