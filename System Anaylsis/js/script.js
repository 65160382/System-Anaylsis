document.getElementById('search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const items = document.querySelectorAll('.Discover-item');
    let found = false;

    items.forEach(item => {
        const text = item.querySelector('.text').textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'block';
            found = true;
        } else {
            item.style.display = 'none';
        }
    });

    const resultsContainer = document.getElementById('search-results');
    if (!found) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
        resultsContainer.innerHTML = '';
    }
});

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}



