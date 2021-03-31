import { ProductsService } from './../../services/products.service';
import { Product } from './../../model/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  // toggleUpdateBtn variable is used to show/hide update button
  toggleUpdateBtn = false;

  // toggleSearchBtn variable is used to
  // show/hide -> search and clear-search button
  toggleSearchBtn = true;

  // emplyee object - type: Employee
  product: Product = new Product();

  // array of emplyee - type: Employee
  products: Product[];

  constructor(private productsService: ProductsService) {}

  // constructor will be called first and Oninit will be called later
  // after constructor method, when component is being initialized.
  ngOnInit() {
    // we added getEmployees() method in ngOnInit()
    // so that we get data to display over template - as soon as template loads.
    this.getProducts();
  }

  getProducts() {
    // we call getEmployees() from EmployeeService to get list of employees
    this.productsService.getProducts().subscribe((data) => {
      // this.employees stores list of employee
      this.products = data.map((e: { payload }) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Product;
      });
    });
  }

  // this method takes an employee object and
  // call addEmployee() method from EmployeeService
  addProduct(product: Product) {
    return this.productsService.addProduct(product);
  }

  // this method takes an employee object and
  // call updateEmployee() method from EmployeeService
  updateProduct(product: Product) {
    this.productsService.updateProduct(product);
    // update done, hide update-button, and show submit-button
    this.toggleUpdateBtn = false;
    // also clear/reset this.employee object
    this.product = new Product();
  }

  // this method takes an employee Id and
  // call deleteEmployee() method from EmployeeService
  deleteEmployee(productId: string) {
    this.productsService.deleteProduct(productId);
  }

  // this method takes employee object and
  // set to local variable this.employee, also enable update-button
  // so that user can edit information and update to database
  editFunc(product: Product) {
    // set employee details to input fields
    this.product = product;
    // show update-button, and hide submit-button
    // so that user can change employee details
    this.toggleUpdateBtn = true;
  }

  // this method takes an employee object and
  // call searchEmployee() method from EmployeeService
  // employeeService.updateEmployee(employee) method
  // will evaluate search parameter and fetch results from
  // Firebase and return back that result will be displayed on screen
  searchProduct(product: Product) {
    // we call searchEmployees(employee) from EmployeeService to get
    // list of employees matched with search params
    // we pass `employee` object which contains search params
    this.productsService.searchProducts(product).subscribe((data) => {
      // this.employees stores list of employee get from search result
      this.products = data.map((e: { payload }) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Product;
      });
    });
  }

  // this function will clear search result and fetch all employee
  clearSearch() {
    // 1. clear employees list
    this.products = [];

    // 2. get all employee
    this.getProducts();
  }
}
