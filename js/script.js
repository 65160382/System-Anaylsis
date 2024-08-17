
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

//ค้นหาข้อมูลในฐานข้อมูล
function searchProducts() {
    const searchTerm = document.getElementById('search-bar').value.trim();
    if (!searchTerm) {
        alert('กรุณากรอกคำค้นหา');
        return;
    }

    // ซ่อนรายการ Daily Discover
    document.getElementById('daily-discover-container').style.display = 'none';

    // แสดงผลลัพธ์การค้นหา
    fetch(`http://localhost:3000/search?q=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('search-results');
            resultsDiv.innerHTML = ''; // ล้างผลลัพธ์ก่อนหน้า
            if (data.length === 0) {
                resultsDiv.innerHTML = 'ไม่พบผลิตภัณฑ์';
            } else {
                data.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product-item';

                    const image = document.createElement('img');
                    image.src = product.image; // แสดงภาพผลิตภัณฑ์
                    image.alt = product.name;
                    image.width = 150; // ขนาดภาพ
                    image.height = 150;
                    image.onclick = () => window.location.href = `detail.html?id=${product.Product_id}`;

                    const name = document.createElement('h3');
                    name.textContent = product.name; // ชื่อผลิตภัณฑ์

                    const price = document.createElement('p');
                    price.textContent = `$${product.price}`; // ราคา

                    const description = document.createElement('p');
                    const stock = document.createElement('p');

                    productDiv.appendChild(image);
                    productDiv.appendChild(name);
                    productDiv.appendChild(price);
                    productDiv.appendChild(description);
                    productDiv.appendChild(stock);

                    resultsDiv.appendChild(productDiv);
                });
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการค้นหาผลลัพธ์:', error);
        });
}

//แสดงผลในส่วนหน้าหลัก
document.addEventListener('DOMContentLoaded', () => {
    fetchDailyDiscover();
});

function fetchDailyDiscover() {
    fetch('http://localhost:3000/daily-discover')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // ตรวจสอบข้อมูลที่ได้รับ
            const container = document.getElementById('daily-discover-container');
            container.innerHTML = ''; // Clear existing content

            if (data.length === 0) {
                container.innerHTML = '<p>No products found.</p>';
                return;
            }
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'Discover-item';
            
                const image = document.createElement('img');
                image.src = product.image;
                image.alt = product.name;
                image.onclick = () => window.location.href = `detail.html?id=${product.Product_id}`;
            
                const name = document.createElement('span');
                name.className = 'text';
                name.textContent = product.name;
            
                const price = document.createElement('span');
                price.className = 'price';
                price.textContent = `$${product.price}`;
            
                productDiv.appendChild(image);
                productDiv.appendChild(name);
                productDiv.appendChild(price);
            
                container.appendChild(productDiv);
            });
            
        })
        .catch(error => console.error('Error fetching:', error));
}

//แสดงชื่อผู้ที่ login
document.addEventListener('DOMContentLoaded', function() {
    displayUsername();
});

function displayUsername() {
    const username = localStorage.getItem('username');
    const usernameDisplay = document.getElementById('username-display');
    const profileIcon = document.getElementById('profile-icon');

    if (username) {
        usernameDisplay.textContent = username;
        profileIcon.style.cursor = 'default'; // ไม่ให้คลิกได้
    } else {
        usernameDisplay.textContent = 'Sign In';
        usernameDisplay.style.cursor = 'pointer'; // ให้คลิกได้
        usernameDisplay.addEventListener('click', function() {
            window.location.href = 'logins.html';
        });
    }
}








