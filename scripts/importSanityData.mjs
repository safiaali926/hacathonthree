import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31',
});

// Function to upload images to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error.message);
    return null;
  }
}

// Function to clear Sanity data
async function clearSanityData() {
  try {
    console.log('Fetching existing products from Sanity...');
    const query = '*[_type == "product"]';
    const existingProducts = await client.fetch(query);

    console.log(`Found ${existingProducts.length} existing products.`);

    for (const product of existingProducts) {
      await client.delete(product._id);
      console.log(`Deleted product: ${product._id}`);
    }

    console.log('All existing products deleted.');
  } catch (error) {
    console.error('Error deleting existing data:', error.message);
  }
}

// Function to import new data
async function importData() {
  try {
    console.log('Fetching new products from API...');
    const response = await axios.get('https://6780c64585151f714b07d16e.mockapi.io/products');
    const products = response.data;

    console.log(`Fetched ${products.length} new products.`);

    for (const product of products) {
      let imageRef = null;
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      const sanityProduct = {
        _type: 'product',
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice || null,
        colors: product.colors || [],
        description: product.description,
        sale: product.sale || false,
        code: product.code || null,
        id: product.id,
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
      };

      const result = await client.create(sanityProduct);
      console.log(`Product uploaded successfully: ${result._id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error.message);
  }
}

// Main function
(async function main() {
  await clearSanityData(); // Clear old data
  await importData(); // Import new data
})();
