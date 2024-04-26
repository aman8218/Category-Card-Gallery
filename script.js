document.addEventListener("DOMContentLoaded", function () {
    const menCardsContainer = document.getElementById("menCards");

    const apiUrl = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const menData = data.categories.find(cat => cat.category_name === "Men").category_products.slice(0, 4);
            menData.forEach(item => {
                const card = createCard(item);
                menCardsContainer.appendChild(card);
            });

            //fetching women data
        const womenProducts = data.categories.find(category => category.category_name === "Women").category_products;

        const womenCards = document.getElementById("womenCards");

        womenProducts.forEach(item => {
            const card = createCard(item);
            womenCards.appendChild(card);
        });

        //fetching kids data
        const kidsProducts = data.categories.find(category => category.category_name === "Kids").category_products;

        const kidsCards = document.getElementById("kidsCards");

        kidsProducts.forEach(item => {
            const card = createCard(item);
            kidsCards.appendChild(card);
        });
    })
                .catch(error => console.error("Error fetching data:", error));

            // Function to create a card element
            function createCard(item) {
                const card = document.createElement("div");
                card.classList.add("card");


                const title = document.createElement("p");
                const trimmedTitle = item.title.length > 15 ? item.title.substring(0, 15) + "..." : item.title;
                title.innerHTML = "<strong style='color: #000; font-weight: bold; font-size: 18px;'>" + (trimmedTitle.length > 15 ? "<span class='long-title'>" + trimmedTitle + "</span>" : trimmedTitle) + "</strong>  <span style='color: #000;margin-left: 5px;'>  • "  + item.vendor + "</span>";

                const price = document.createElement("p");
                const comparePrice = document.createElement("p");
                price.innerHTML = "<strong style='color: #000;'>Rs " + item.price + ".00</strong> <span style='color: #666;'>" + (item.compare_at_price ? "<del>" + item.compare_at_price + ".00</del> " : "") + ".00</span> <span style='color: red; font-weight: bold;margin-left: 80px;'>" + calculateDiscount(item.price, item.compare_at_price) + "</span>";


                // Create product image element
                const imgContainer = document.createElement("div");
                imgContainer.classList.add("image-container");
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.title;

                // Create badge element if badge_text exists
                if (item.badge_text) {
                    const badge = document.createElement("p");
                    badge.classList.add("badge");
                    badge.textContent = item.badge_text;
                    badge.style.backgroundColor="white";
                    badge.style.color="black";
                    badge.style.marginLeft="10px";
                    badge.style.marginTop="10px";
                    // badge.style.height="30px"
                    badge.style.padding="15px"
                    badge.style.width="150px"
                    badge.style.borderRadius="5px"
                    imgContainer.appendChild(badge);
                }

                imgContainer.appendChild(img);
                card.appendChild(imgContainer);

                const addToCartButton = document.createElement("button");
                addToCartButton.textContent = "Add to Cart";
                addToCartButton.classList.add("add-to-cart");

                // Add event listener to the "Add to Cart" button
                addToCartButton.addEventListener("click", () => {
                    // Logic to add the item to the cart goes here
                    console.log("Item added to cart:", item.title);
                });

                card.appendChild(title);
                card.appendChild(price);
                card.appendChild(comparePrice);
                card.appendChild(addToCartButton);

                return card;

            }

            // Function to calculate discount percentage
            function calculateDiscount(price, comparePrice) {
                const discount = ((comparePrice - price) / comparePrice) * 100;
                return Math.round(discount) + "% Off";
            }

            // Selecting the buttons
            const menButton = document.querySelector('.btn-men');
            const womenButton = document.querySelector('.btn-women');
            const kidsButton = document.querySelector('.btn-kids');

            // Selecting the card containers
            const menCards = document.getElementById("menCards");
            const womenCards = document.getElementById("womenCards");
            const kidsCards = document.getElementById("kidsCards");

            // Function to remove 'btn-active' class from all buttons
            function resetButtonState() {
                menButton.classList.remove('btn-active');
                womenButton.classList.remove('btn-active');
                kidsButton.classList.remove('btn-active');
            }

    // Adding event listeners to the buttons
    menButton.addEventListener('click', () => {
    resetButtonState();
    menButton.classList.add('btn-active');
    menCards.style.display = 'flex';
    womenCards.style.display = 'none';
    kidsCards.style.display = 'none';

});


womenButton.addEventListener('click', () => {
    resetButtonState();
    womenButton.classList.add('btn-active');
    menCards.style.display = 'none';
    womenCards.style.display = 'flex';
    kidsCards.style.display = 'none';

});

kidsButton.addEventListener('click', () => {
    resetButtonState();
    kidsButton.classList.add('btn-active');
    menCards.style.display = 'none';
    womenCards.style.display = 'none';
    kidsCards.style.display = 'flex';
});

// Initially show only men's category
menCards.style.display = 'flex';
womenCards.style.display = 'none';
kidsCards.style.display = 'none';

    

});
