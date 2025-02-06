import { Component } from '@angular/core';

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  featured: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  categories: string[] = ['Electrónica', 'Ropa', 'Hogar'];
  filteredCategory: string = '';  
  sortedAscending: boolean = true;
  searchTerm: string = '';

  productsFiltrados: Product[] = [];

  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    featured: false
  };

  editIndex: number | null = null;  

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    if (storedProducts.length) {
      this.products = storedProducts;
    } else {
      this.products = [
        { name: 'Cámara', description: 'Cámara de seguridad', price: 100, stock: 10, category: 'Electrónica', featured: false },
        { name: 'Chaqueta', description: 'Chaqueta de cuero', price: 50, stock: 5, category: 'Ropa', featured: true },
        { name: 'Sofa', description: 'Sofa cómodo', price: 300, stock: 2, category: 'Hogar', featured: false },
      ];
    }
  

    this.productsFiltrados = this.filteredCategory
      ? this.products.filter(product => product.category === this.filteredCategory)
      : this.products;  
  }

  addProduct(product: Product) {
    if (product.name && product.description && product.price > 0 && product.stock >= 0 && product.category) {
      this.products.push({ ...product });
      this.saveProducts();
      this.resetNewProduct();
    }
  }

  setEditProduct(index: number) {
    this.editIndex = index;  
    this.newProduct = { ...this.products[index] };  
  }

  editProduct(index: number, updatedProduct: Product) {
    this.products[index] = updatedProduct;
    this.saveProducts();
    this.resetNewProduct();
    this.editIndex = null;  
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.saveProducts();
  }

  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  filterByCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.filteredCategory = target.value;
      this.loadProducts();
    }
  }

  sortByPrice() {
    this.products.sort((a, b) => this.sortedAscending ? a.price - b.price : b.price - a.price);
    this.sortedAscending = !this.sortedAscending;
  }

  markAsFeatured(index: number) {
    this.products[index].featured = !this.products[index].featured;
    this.saveProducts();
  }

  resetNewProduct() {
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      featured: false
    };
  }


}
