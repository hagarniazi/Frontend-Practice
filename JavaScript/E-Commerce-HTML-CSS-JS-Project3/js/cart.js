const cartContainer = document.getElementById("cart-container");
const cartSummary = document.getElementById("cart-summary");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartSummary.innerHTML = "";
        return;
    }

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const productImage = document.createElement("img");
        productImage.src = item.product.thumbnail;
        productImage.alt = item.product.title;
        cartItem.appendChild(productImage);

        const productInfo = document.createElement("div");
        productInfo.classList.add("cart-item-info");

        const productTitle = document.createElement("h3");
        productTitle.textContent = item.product.title;
        productInfo.appendChild(productTitle);

        const productPrice = document.createElement("p");
        productPrice.textContent = `$${item.product.price}`;
        productInfo.appendChild(productPrice);

        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-controls");

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";

        decreaseButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(
                    (cartItem) => cartItem.product.id !== item.product.id
                );
            }

            saveCart();
            renderCart();
        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";

        increaseButton.addEventListener("click", () => {
            item.quantity++;

            saveCart();
            renderCart();
        });

        quantityContainer.appendChild(decreaseButton);
        quantityContainer.appendChild(quantity);
        quantityContainer.appendChild(increaseButton);

        productInfo.appendChild(quantityContainer);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {
            cart = cart.filter(
                (cartItem) => cartItem.product.id !== item.product.id
            );

            saveCart();
            renderCart();
        });

        productInfo.appendChild(removeButton);

        cartItem.appendChild(productInfo);

        cartContainer.appendChild(cartItem);
    });

    renderSummary();
}

function renderSummary() {
    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    cartSummary.innerHTML = `
        <h2>Order Summary</h2>
        <p>Items: ${totalItems}</p>
        <p>Total: $${totalPrice.toFixed(2)}</p>
        <button>Checkout</button>
    `;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

renderCart();