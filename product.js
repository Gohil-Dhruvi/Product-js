const formPage = document.getElementById('form-page');
const cardPage = document.getElementById('card-page');
const productForm = document.getElementById('product-form');
const cardsContainer = document.getElementById('cards-container');

function saveProductToLocalStorage(product) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function loadProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

function deleteProductFromLocalStorage(index) {
    const products = loadProductsFromLocalStorage();
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
}

function renderCards() {
    const products = loadProductsFromLocalStorage();
    cardsContainer.innerHTML = '';

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${product.title}</h3>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Price:</strong> ₹${product.price}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <button onclick="removeProduct(${index})">Remove</button>
        `;
        cardsContainer.appendChild(card);
    });
}

function removeProduct(index) {
    if (confirm('Are you sure you want to remove this product?')) {
        deleteProductFromLocalStorage(index);
        renderCards();
    }
}

function goToCardPage() {
    renderCards();
    formPage.style.display = 'none';
    cardPage.style.display = 'block';
}

function goToFormPage() {
    formPage.style.display = 'block';
    cardPage.style.display = 'none';
}

productForm.addEventListener('submit', (submit) => {
    submit.preventDefault();

    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value,
        brand: document.getElementById('brand').value
    };

    saveProductToLocalStorage(product);
    productForm.reset();
    alert('Product added successfully!');
});
