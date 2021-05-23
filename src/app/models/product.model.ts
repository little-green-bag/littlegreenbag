export class ProductModel {
  id: string;
  name: string;
  description: string;
  category: string;
  images?: string[];
  price: number;

  constructor(product) {
    {
      this.id = product.id || '';
      this.name = product.name || '';
      this.description = product.description || '';
      this.images = product.images || [];
      this.price = product.price || null;
    }
  }
}
