export class ImageModel {
  name: string;
  url: string;
  constructor(image) {
    {
      this.name = image.name || '';
      this.url = image.url || '';
    }
  }
}

export class ProductModel {
  id: string;
  name: string;
  description: string;
  category: string;
  images?: ImageModel[];
  // remove bottom and change for cover image
  imageUrl?: string[];
  price: number;
  stockCount?: number;

  constructor(product) {
    {
      this.id = product.id || '';
      this.name = product.name || '';
      this.description = product.description || '';
      this.images = product.images || [];
      this.price = product.price || 0;
      this.stockCount = product.stockCount || 0;
      this.category = product.category || '';
    }
  }
}
