export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  skuCode: string;
};

export type ProductRequest = {
  skuCode: string;
  name: string;
  description: string;
  price: number;
};
