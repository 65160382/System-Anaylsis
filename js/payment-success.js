document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    document.getElementById('order-number').textContent = orderId;
    document.getElementById('order-id').textContent = `รหัสคำสั่งซื้อของคุณคือ: ${orderId}`;
});

document.addEventListener('DOMContentLoaded', () => {
    const orderId = 'ORDER_ID_HERE'; // คุณสามารถดึง orderId จาก URL หรือที่อื่นๆ ได้
    fetch(`/orders/${orderId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.success === false) {
          console.error('Error:', data.message);
          return;
        }
        document.getElementById('order-number').textContent = data.id;
        document.getElementById('order-id').textContent = data.id;
        document.getElementById('payment-amount').textContent = data.amount + ' บาท';
        document.getElementById('order-status').textContent = data.status;
        document.getElementById('customer-email').textContent = data.customer_email;
      })
      .catch(error => console.error('Fetch error:', error));
  });
  
  
  