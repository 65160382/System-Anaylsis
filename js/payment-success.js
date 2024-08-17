document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    document.getElementById('order-number').textContent = orderId;
    document.getElementById('order-id').textContent = `รหัสคำสั่งซื้อของคุณคือ: ${orderId}`;
});