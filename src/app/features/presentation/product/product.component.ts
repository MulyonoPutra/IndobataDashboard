import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/domain/entities/product';
import { ProductRepository } from '../../core/repositories/product.repository';
import { DataUtils } from '../../core/services/utils/data-utils.service';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  
  products: Product[] = [];

  constructor(
    private productService: ProductRepository,
    protected dataUtils: DataUtils
  ) {}

  ngOnInit(): void {
    this.findAllProduct();
  }

  findAllProduct() {
    this.products = [];
    this.productService.getAllProduct().subscribe((value: Product[]) => {
      this.products = value;
    });
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }
}
