document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const quantity = urlParams.get("quantity");

  if (productId && quantity) {
    fetchProductDetails(productId)
      .then((product) => {
        renderProductDetails(product, quantity);
        renderPaymentMethods();
        renderOrderSummary(product.price, quantity);
        setupOrderButton(productId, quantity, product.price);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  } else {
    document.getElementById("order-detail-container").innerHTML =
      "<p>ไม่พบสินค้า</p>";
  }

  fetchAddressDetails();
});

function fetchProductDetails(productId) {
  return fetch(`http://localhost:3000/products/${productId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching product details:", error);
      throw error;
    });
}

function renderProductDetails(product, quantity) {
  const container = document.getElementById("order-detail-container");
  container.innerHTML = `                  
    <img src="${product.image}" alt="${product.name}">
    <div class="details">
      <p class="name">${product.name}</p>
      <p class="price">$${product.price}</p>
      <p>Quantity: ${quantity}</p>
    </div>
  `;
}

function renderPaymentMethods() {
  const paymentContainer = document.getElementById("order-detail-payment");
  paymentContainer.innerHTML = `
    <div class="payment-methods">
      <h3>วิธีการชำระเงิน</h3>
      <label>
        <input type="radio" name="payment-method" value="credit-card" checked>
        credit-card
      </label>
      <label>
        <input type="radio" name="payment-method" value="qr-payment">
        qr-payment
      </label>
      <label>
        <input type="radio" name="payment-method" value="internet-banking">
        internet-banking
      </label>
      <label>
        <input type="radio" name="payment-method" value="bank-transfer">
        bank-transfer
      </label>
      <label>
        <input type="radio" name="payment-method" value="promptpay">
        promptpay
      </label>
    </div>
  `;
}

function renderOrderSummary(price, quantity) {
  const totalPrice = calculateTotalPrice(price, quantity);
  const container = document.getElementById("order-detail-summary");
  container.innerHTML = `  
    <div class="details-summary">
      <p class="price">Price per unit: $${price}</p>
      <p class="quantity">Quantity: ${quantity}</p>
      <p class="total-price">Total Price: $${totalPrice}</p>
    </div>
    <button type="button" id="order-button">สั่งซื้อเลย</button>
  `;
}

function setupOrderButton(productId, quantity, price) {
  document.getElementById("order-button").addEventListener("click", () => {
    const customerId = localStorage.getItem("Customer_id");
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const orderDate = new Date().toISOString();
    const totalPrice = calculateTotalPrice(price, quantity);
    const status = 'open'; // สถานะ

    savePaymentDetails(customerId, paymentMethod, totalPrice)
      .then((paymentResult) => {
        const paymentId = paymentResult.paymentId;
        return saveOrderDetails(customerId, productId, orderDate, quantity, paymentId, status);
      })
      .then((orderResult) => {
        return updateProductStock(productId, quantity);
      })
      .then((stockResult) => {
        window.location.href = 'payment-success.html';
      })
      .catch((error) => console.error("Error:", error));
  });
}

function fetchAddressDetails() {
  const customerId = localStorage.getItem("Customer_id");

  fetch("http://localhost:3000/address")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("order-detail-address");
      const list = document.createElement("ul");

      data.forEach((address) => {
        const listItem = document.createElement("li");
        listItem.classList.add("address-item");
        listItem.innerHTML = `
          ${address.address}, อำเภอ${address.district}, จังหวัด${address.province}, ${address.zipcode}, ${address.country}
          <button class="change-address-btn">เปลี่ยนที่อยู่</button>
        `;
        list.appendChild(listItem);
      });

      container.appendChild(list);

      return fetch(`http://localhost:3000/customer/${customerId}`);
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const userInfo = document.createElement("div");
        userInfo.classList.add("user-info");
        userInfo.innerHTML = `
          <p>ชื่อ-นามสกุล: ${data.customer.first_name} ${data.customer.last_name}</p>
          <p>อีเมล: ${data.customer.email}</p>
          <p>เบอร์โทร: ${data.customer.phone}</p>
        `;
        document.getElementById("order-detail-address").appendChild(userInfo);
      } else {
        console.error("Error fetching customer data:", data.message);
      }
    })
    .catch((error) => console.error("Error fetching addresses or customer data:", error));
}


//อัพเดตข้อมูลลงฐานข้อมูล
function saveOrderDetails(customerId, productId, orderDate, quantity, paymentId, status) {
  return fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer_id: customerId,
      product_id: productId,
      order_date: orderDate,
      quantity: quantity,
      payment_id: paymentId,
      status: status
    }),
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(error => {
        throw new Error(`Error saving order details: ${error.message}`);
      });
    }
    return response.json();
  })
  .then(data => {
    return data;
  });
}

function savePaymentDetails(customerId, paymentMethod, amount) {
  return fetch('http://localhost:3000/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer_id: customerId,
      payment_method: paymentMethod,
      amount: amount,
    }),
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(error => {
        throw new Error(`Error saving payment details: ${error.message}`);
      });
    }
    return response.json();
  })
  .then(data => {
    return data;
  });
}

function updateProductStock(productId, quantity) {
  return fetch(`http://localhost:3000/products/${productId}/stock`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity: quantity,
    }),
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(error => {
        throw new Error(`Error updating product stock: ${error.message}`);
      });
    }
    return response.json();
  })
  .then(data => {
    return data;
  });
}



function calculateTotalPrice(price, quantity) {
  return price * quantity;
}
