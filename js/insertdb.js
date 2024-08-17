document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    const stock = document.getElementById('stock').value;

    const product = { name, price, description,image,stock };

    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            alert('Product added successfully!');
            document.getElementById('productForm').reset();
        } else {
            const errorData = await response.json();
            alert('Error adding product: ' + errorData.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding product: ' + error.toString());
    }
});

