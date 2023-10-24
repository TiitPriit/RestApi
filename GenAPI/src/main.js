import { fetchProducts, createProduct, updateProduct, deleteProduct } from './api';

async function main() {
  const productList = document.getElementById('product-list');
  const productNameInput = document.getElementById('product-name');
  const productPriceInput = document.getElementById('product-price');
  const addProductButton = document.getElementById('add-product');
  const updateProductButton = document.getElementById('update-product');
  const deleteProductButton = document.getElementById('delete-product');

  async function loadProducts() {
    try {
      const products = await fetchProducts();
      productList.innerHTML = '';
      products.forEach((product) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name}: $${product.price}`;
        listItem.setAttribute('data-id', product.id);
        productList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  addProductButton.addEventListener('click', async () => {
    const name = productNameInput.value;
    const price = parseFloat(productPriceInput.value);

    if (name && !isNaN(price)) {
      try {
        await createProduct({ name, price });
        loadProducts();
        productNameInput.value = '';
        productPriceInput.value = '';
      } catch (error) {
        console.error('Error creating a new product:', error);
      }
    } else {
      alert('Please provide a valid product name and price.');
    }
  });

  updateProductButton.addEventListener('click', async () => {
    const selectedProduct = productList.querySelector('.selected');
    if (selectedProduct) {
      const productId = selectedProduct.getAttribute('data-id');
      const name = productNameInput.value;
      const price = parseFloat(productPriceInput.value);

      if (productId && name && !isNaN(price)) {
        try {
          await updateProduct(productId, { name, price });
          loadProducts();
          productNameInput.value = '';
          productPriceInput.value = '';
        } catch (error) {
          console.error('Error updating product:', error);
        }
      } else {
        alert('Please select a product and provide valid name and price.');
      }
    } else {
      alert('Please select a product to update.');
    }
  });
  deleteProductButton.addEventListener('click', async () => {
    const selectedProduct = productList.querySelector('.selected');
    if (selectedProduct) {
      const productId = selectedProduct.getAttribute('data-id');
  
      if (productId) { 
        try {
          const success = await deleteProduct(productId);
          if (success) {
            loadProducts();
            productNameInput.value = '';
            productPriceInput.value = '';
          } else {
            console.error('Error deleting product: The delete request did not succeed.');
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      } else {
        alert('Please select a product to delete.');
      }
    }
  });
  

  productList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const selectedProduct = productList.querySelector('.selected');
      if (selectedProduct) {
        selectedProduct.classList.remove('selected');
      }
      event.target.classList.add('selected');
      const [name, price] = event.target.textContent.split(': $');
      productNameInput.value = name;
      productPriceInput.value = parseFloat(price);
    }
  });

  loadProducts();
}

main();
