const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");
const productDetails = document.getElementById("product-details");
const wishlistCount = document.getElementById("wishlist-count");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let products = [];

function updateCounters() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    wishlistCount.textContent = wishlist.length;

    const cartItemsCount = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = cartItemsCount;
}

function renderCart() {
    cartContainer.innerHTML = "";

    localStorage.setItem("cart", JSON.stringify(cart));

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const cartItemTitle = document.createElement("h3");
        cartItemTitle.textContent = item.product.title;
        cartItem.appendChild(cartItemTitle);

        const cartItemPrice = document.createElement("p");
        cartItemPrice.textContent = `$${item.product.price}`;
        cartItem.appendChild(cartItemPrice);

        const cartItemQuantity = document.createElement("p");
        cartItemQuantity.textContent = `Quantity: ${item.quantity}`;
        cartItem.appendChild(cartItemQuantity);

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.addEventListener("click", () => {
            item.quantity++;
            renderCart();
        });
        cartItem.appendChild(increaseButton);

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter((cartItem) => cartItem.product.id !== item.product.id);
            }
            renderCart();
        });
        cartItem.appendChild(decreaseButton);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {
            cart = cart.filter((cartItem) => cartItem.product.id !== item.product.id);
            renderCart();
        });
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);
    });

    const cartTotal = cart.reduce((total, item) => {
        return total + item.product.price * item.quantity;
        }, 0);

        const totalElement = document.createElement("h2");
        totalElement.textContent = `Total: $${cartTotal}`;
        cartContainer.appendChild(totalElement);

        updateCounters();
    
}

function renderProducts(productsToRender) {
    productsContainer.innerHTML = "";

        productsToRender.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            const productImage = document.createElement("img");
            productImage.src = product.thumbnail;
            productCard.appendChild(productImage);

            const productTitle = document.createElement("h2");
            productTitle.textContent = product.title;
            productCard.appendChild(productTitle);

            const productPrice = document.createElement("p");
            productPrice.textContent = `$${product.price}`;
            productCard.appendChild(productPrice);

            const productRating = document.createElement("p");
            productRating.textContent = `⭐ ${product.rating}`;
            productCard.appendChild(productRating);

            const addToCartButton = document.createElement("button");
            addToCartButton.textContent = "Add to Cart";
            productCard.appendChild(addToCartButton);

            const detailsButton = document.createElement("button");
            detailsButton.textContent = "View Details";
            productCard.appendChild(detailsButton);

            detailsButton.addEventListener("click", () => {
                window.location.href = `product-details.html?id=${product.id}`;
            });

            const wishlistButton = document.createElement("button");
                wishlistButton.textContent = "♡ Wishlist";

            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

                const isInWishlist = wishlist.some((item) => item.id === product.id);

                if (isInWishlist) {
                    wishlistButton.textContent = "♥ Wishlist";
                }

                wishlistButton.addEventListener("click", () => {
                    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

                    const existingProduct = wishlist.find((item) => item.id === product.id);

                    if (existingProduct) {
                        wishlist = wishlist.filter((item) => item.id !== product.id);
                        wishlistButton.textContent = "♡ Wishlist";
                    } else {
                        wishlist.push(product);
                        wishlistButton.textContent = "♥ Wishlist";
                    }

                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    updateCounters();
                });

                productCard.appendChild(wishlistButton);

            addToCartButton.addEventListener("click", () => {
                const existingProduct = cart.find((item) => item.product.id === product.id);
                    if (existingProduct) {
                        existingProduct.quantity++;
                    } else {
                        cart.push({
                            product: product,
                            quantity: 1
                        });
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));

                    updateCounters();
                    console.log(cart[0].quantity);
                });

                productsContainer.appendChild(productCard);
        });
    }

function renderProductDetails(product) {
    productDetails.innerHTML = "";

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("product-details");

    const image = document.createElement("img");
    image.src = product.thumbnail;
    detailsContainer.appendChild(image);

    const title = document.createElement("h2");
    title.textContent = product.title;
    detailsContainer.appendChild(title);

    const description = document.createElement("p");
    description.textContent = product.description;
    detailsContainer.appendChild(description);

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    detailsContainer.appendChild(price);

    const rating = document.createElement("p");
    rating.textContent = `⭐ ${product.rating}`;
    detailsContainer.appendChild(rating);

    const category = document.createElement("p");
    category.textContent = `Category: ${product.category}`;
    detailsContainer.appendChild(category);

    const stock = document.createElement("p");
    stock.textContent = `Stock: ${product.stock}`;
    detailsContainer.appendChild(stock);

    productDetails.appendChild(detailsContainer);
}

function updateProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortValue = sortFilter.value;

    let filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (sortValue === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    renderProducts(filteredProducts);
}

searchInput.addEventListener("input", updateProducts);

categoryFilter.addEventListener("change", updateProducts);

sortFilter.addEventListener("change", updateProducts);

fetch("https://dummyjson.com/products")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        products = data.products;

        const categories = [...new Set(products.map((product) => product.category))];

        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        renderProducts(products);

        updateCounters();
    });


