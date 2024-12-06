 const productForm = document.getElementById('productForm');
 const productTable = document.getElementById('productTable').querySelector('tbody');

 function loadProducts() {
     const products = JSON.parse(localStorage.getItem('products')) || [];
     products.forEach((product, index) => {
         addProductToTable(product, index);
     });
 }

 function saveProduct(product) {
     const products = JSON.parse(localStorage.getItem('products')) || [];
     products.push(product);
     localStorage.setItem('products', JSON.stringify(products));
 }

 function removeProduct(index) {
     const products = JSON.parse(localStorage.getItem('products')) || [];
     products.splice(index, 1);
     localStorage.setItem('products', JSON.stringify(products));
 }

 function addProductToTable(product, index) {
     const row = document.createElement('tr');
     row.innerHTML = `
         <td>${product.title}</td>
         <td>${product.description}</td>
         <td>${product.category}</td>
         <td>₹${product.price}</td>
         <td><button class="remove-button" data-index="${index}">Remove</button></td>
     `;
     productTable.appendChild(row);
 }

 productForm.addEventListener('submit', (e) => {
     e.preventDefault();

     const product = {
         title: document.getElementById('title').value,
         description: document.getElementById('description').value,
         category: document.getElementById('category').value,
         price: document.getElementById('price').value,
     };

     saveProduct(product);
     addProductToTable(product, JSON.parse(localStorage.getItem('products')).length - 1);

     productForm.reset();
 });
