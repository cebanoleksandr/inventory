import { Order, Product } from "./types";

export const getOrderProducts = (products: Product[], ids: number[] = []) => {
  const filteredProducts = products.filter(p => ids.includes(p.id));

  return filteredProducts;
}

export const getFilteredOrders = (orders: Order[], query: string): Order[] => {
  let filteredOrders = orders;
  const normalizedQuery = query.toLowerCase().trim();

  if (!!normalizedQuery) {
    filteredOrders = filteredOrders.filter(order => order.name.toLowerCase().includes(normalizedQuery))
  }

  return filteredOrders;
}

export const getFilteredProducts = (products: Product[], query: string, type: string): Product[] => {
  let filteredProducts = products;
  const normalizedQuery = query.toLowerCase().trim();

  if (!!normalizedQuery) {
    filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(normalizedQuery));
  }

  if (type !== '') {
    filteredProducts = filteredProducts.filter(p => p.type === type);
  }

  return filteredProducts;
}

export const getUniqueTypes = (types: string[]): string[] => {
  const uniqueTypes: string[] = [];

  for (const type of types) {
    if (!uniqueTypes.includes(type)) {
      uniqueTypes.push(type);
    }
  }

  return uniqueTypes;
}
