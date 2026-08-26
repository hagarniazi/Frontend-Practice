const productDetails = document.getElementById("product-details");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`https://dummyjson.com/products/${productId}`)
    .then((response) => {
        return response.json();
    })
    .then((product) => {
        productDetails.classList.add("product-details");
        
        const image = document.createElement("img");
        image.src = product.thumbnail;
        productDetails.appendChild(image);

        const title = document.createElement("h1");
        title.textContent = product.title;
        productDetails.appendChild(title);

        const description = document.createElement("p");
        description.textContent = product.description;
        productDetails.appendChild(description);

        const price = document.createElement("p");
        price.textContent = `$${product.price}`;
        productDetails.appendChild(price);

        const rating = document.createElement("p");
        rating.textContent = `⭐ ${product.rating}`;
        productDetails.appendChild(rating);

        const category = document.createElement("p");
        category.textContent = `Category: ${product.category}`;
        productDetails.appendChild(category);

        const stock = document.createElement("p");
        stock.textContent = `Stock: ${product.stock}`;
        productDetails.appendChild(stock);

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("product-buttons");
        productDetails.appendChild(buttonsContainer);

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        buttonsContainer.appendChild(addToCartButton);

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

        const backButton = document.createElement("button");
            backButton.textContent = "Back to Products";

            backButton.addEventListener("click", () => {
                window.location.href = "index.html";
            });

            buttonsContainer.appendChild(backButton);
    });