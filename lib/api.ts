export const fetchProducts = async (page: number = 1) => {
  const res = await fetch(`/api/products?page=${page}`);
  return res.json();
};

export const searchProducts = async (query: string) => {
  const res = await fetch(`/api/products?search=${query}`);
  return res.json();
};

export const fetchByCategory = async (category: string) => {
  const res = await fetch(
    `https://world.openfoodfacts.org/category/${category}.json`
  );
  return res.json();
};

export const fetchProductByBarcode = async (barcode: string) => {
  const res = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );
  return res.json();
};