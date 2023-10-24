import { Order } from "../utils/types";

export let ordersFromServer: Order[] = [
  {
    "id": 1,
    "name": "Order 1",
    "created_at": "23/SEP/2023",
    "products": [1, 2, 3]
  },
  {
    "id": 2,
    "name": "Order 2",
    "created_at": "15/MAR/2023",
    "products": [4, 5]
  },
  {
    "id": 3,
    "name": "Order 3",
    "created_at": "01/JAN/2023",
    "products": [6, 7, 8]
  },
  {
    "id": 4,
    "name": "Order 4",
    "created_at": "10/MAY/2023",
    "products": [9]
  },
  {
    "id": 5,
    "name": "Order 5",
    "created_at": "20/NOV/2023",
    "products": [10, 11, 12]
  },
  {
    "id": 6,
    "name": "Order 6",
    "created_at": "31/AUG/2023",
    "products": [13, 14, 15]
  },
  {
    "id": 7,
    "name": "Order 7",
    "created_at": "12/FEB/2023",
    "products": [16, 17]
  },
  {
    "id": 8,
    "name": "Order 8",
    "created_at": "18/APR/2023",
    "products": [18, 19, 20]
  },
  {
    "id": 9,
    "name": "Order 9",
    "created_at": "27/JUL/2023",
    "products": [21]
  },
  {
    "id": 10,
    "name": "Order 10",
    "created_at": "05/DEC/2023",
    "products": [22, 23, 24]
  }
];

export const getAllOrders = (): Order[] => {
  return ordersFromServer;
}

export const getOrderById = (orderId: number): Order | null => {
  return ordersFromServer.find(order => order.id === orderId) || null;
}

export const removeOrder = (orderId: number): void => {
  ordersFromServer = ordersFromServer.filter(order => order.id !== orderId);
}

export const createOrder = (name: string, products: number[]): Order => {
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const date = new Date();
  const created_at = `${date.getDate()}/${monthNames[date.getMonth()]}/${date.getFullYear()}`;

  const order: Order = {
    id: +(new Date()),
    name,
    created_at,
    products
  }

  ordersFromServer = [order, ...ordersFromServer];

  return order;
}

export const updateOrder = (orderId: number, name: string, productId: number): void => {
  let foundedOrder = ordersFromServer.find(order => order.id === orderId);

  if (!!foundedOrder) {
    foundedOrder = {
      ...foundedOrder,
      name,
      products: [...foundedOrder.products, productId],
    }
  }
}

export const pushProductId = (orderId: number, productId: number) => {
  ordersFromServer = ordersFromServer.map(order => {
    if (order.id === orderId) {
      return {
        ...order,
        products: [productId, ...order.products]
      }
    }

    return order;
  });
}
