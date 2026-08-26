const wishlistContainer = document.getElementById("wishlist-container");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

wishlist.forEach((product) => {
    const productCard = document.createElement("div");

    const image = document.createElement("img");
    image.src = product.thumbnail;
    image.alt = product.title;
    productCard.appendChild(image);

    const title = document.createElement("h2");
    title.textContent = product.title;
    productCard.appendChild(title);

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    productCard.appendChild(price);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
        wishlist = wishlist.filter((item) => item.id !== product.id);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        productCard.remove();
    });

    productCard.appendChild(removeButton);

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";

    addToCartButton.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
    });

    productCard.appendChild(addToCartButton);

    wishlistContainer.appendChild(productCard);
});