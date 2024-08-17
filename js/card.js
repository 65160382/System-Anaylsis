let tColorA = document.getElementById('tColorA'),
    tColorB = document.getElementById('tColorB'),
    tColorC = document.getElementById('tColorC'),
    iconA = document.querySelector('.fa-credit-card'),
    iconB = document.querySelector('.fa-building-columns'),
    iconC = document.querySelector('.fa-wallet'),
    cDetails = document.querySelector('.card-details');

function doFun() {
    tColorA.style.color = "Blue";
    tColorB.style.color = "#444";
    tColorC.style.color = "#444";
    iconA.style.color = "Blue";
    iconB.style.color = "#aaa";
    iconC.style.color = "#aaa";
    cDetails.style.display = "block";
}

function doFunA() {
    tColorA.style.color = "#444";
    tColorB.style.color = "Blue";
    tColorC.style.color = "#444";
    iconA.style.color = "#aaa";
    iconB.style.color = "Blue";
    iconC.style.color = "#aaa";
    cDetails.style.display = "none";
}

function doFunB() {
    tColorA.style.color = "#444";
    tColorB.style.color = "#444";
    tColorC.style.color = "Blue";
    iconA.style.color = "#aaa";
    iconB.style.color = "#aaa";
    iconC.style.color = "Blue";
    cDetails.style.display = "none";
}

function processPayment(event) {
    event.preventDefault();

    const orderId = 'ORD' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    window.location.href = `payment-success.html?orderId=${orderId}`;
}
