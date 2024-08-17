document.addEventListener('DOMContentLoaded', () => {
    // ดึงพารามิเตอร์ id จาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch(`http://localhost:3000/products/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(product => {
                const container = document.getElementById('product-detail-container');
                container.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="details">
                        <h1>${product.name}</h1>
                        <p class="price">Price: $${product.price}</p>
                        <p class="stock">Stock: ${product.stock}</p>
                        <p>${product.description}</p>
                        <div class="rating">
                            <span>★★★★★</span>
                            <span>(${product.reviews} reviews)</span>
                        </div>
                        <div class="quantity-selector">
        <label for="quantity">Quantity</label>
        <button  id="decrease" onclick="updateQuantity(-1)">-</button>
        <input type="text" id="quantity" value="1" readonly>
        <button id="increase" onclick="updateQuantity(1)">+</button>
    </div>
                        <div class="button-group">
                            <button onclick="addToCart(${product.id})">Add to Cart</button>
                            <button onclick="buyNow(${product.Product_id})">Buy Now</button>
                        </div>
                    </div>
                `;
            })
            .catch(error => console.error('Error fetching product details:', error));
    } else {
        document.getElementById('product-detail-container').innerHTML = '<p>Product not found.</p>';
    }
});

function addToCart(productId) {
    // ฟังก์ชันสำหรับเพิ่มสินค้าในตะกร้า
    console.log(`Product ${productId} added to cart`);
}

function buyNow(productId) {
    if (!productId) {
        alert("Product ID is missing. Please try again.");
        return;
    }
    const currentQuantity = parseInt(document.getElementById('quantity').value);
    if (currentQuantity > 0) {
        window.location.href = `order.html?id=${productId}&quantity=${currentQuantity}`;
    } else {
        alert("Please select a valid quantity.");
    }
}

function updateQuantity(change) {
    let quantityInput = document.getElementById('quantity');
    let currentQuantity = parseInt(quantityInput.value);
    let newQuantity = currentQuantity + change;

    if (newQuantity >= 1) {
        quantityInput.value = newQuantity;
        // อัปเดตฐานข้อมูลที่นี่
        updateDatabase(newQuantity);
    }
}





