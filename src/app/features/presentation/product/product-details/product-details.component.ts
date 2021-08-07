import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clients } from 'src/app/features/core/domain/entities/clients';
import { Product } from 'src/app/features/core/domain/entities/product';
import { ProductRepository } from 'src/app/features/core/repositories/product.repository';

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  public product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductRepository
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById(): void {
    let id = +this.route.snapshot.params["id"];
    this.productService.getProductById(id).subscribe((data: Product) => {
      this.product = data;
      console.log(data);
    });
  }

  previousState(): void {
    window.history.back();
  }
}
