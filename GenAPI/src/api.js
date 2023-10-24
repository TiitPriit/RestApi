export async function fetchProducts() {
    try {
        const response = await fetch('https://usman-fake-api.herokuapp.com/api/products');
        if (!response.ok) {
            throw new Error(`Failed to fetch data from the API`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

  
  export async function createProduct(productData) {
    try {
      const response = await fetch('https://usman-fake-api.herokuapp.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to create a new product');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating a new product:', error);
      throw error;
    }
  }
  
  export async function updateProduct(productId, productData) {
    try {
        const response = await fetch(`https://usman-fake-api.herokuapp.com/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to update the product');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating the product:', error);
        throw error;
    }
}
export async function deleteProduct(productId) {
    try {
        const response = await fetch(`https://usman-fake-api.herokuapp.com/api/products/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete the product');
        }
        return true;
    } catch (error) {
        console.error('Error deleting the product:', error);
        throw error;
    }
}
