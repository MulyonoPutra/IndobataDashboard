import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../core/domain/entities/category';
import { Product } from '../../core/domain/entities/product';
import { CategoryRepository } from '../../core/repositories/category.repository';

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  public currentCategoryId: number = 1;

  public categories: Category[] = [];

  public product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryRepository,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllCategory();
  }

  findAllCategory() {
    this.categories = [];
    this.categoryService.getAllCategory().subscribe((value: Category[]) => {
      this.categories = value;
      console.log(value);
    });
  }

  handleProductByCategory() {
    const hasCategoryId: boolean =
      this.activatedRoute.snapshot.paramMap.has("id");

    if (hasCategoryId) {
      this.currentCategoryId =
        +this.activatedRoute.snapshot.paramMap.get("id")!;
    } else {
      this.currentCategoryId = 1;
    }
  }

  postDetailsRoute(products: any): void {
    this.product = products;
    this.router.navigateByUrl("/category-details/" + products.id);
  }

  confirmDelete(id: number): void {
    this.categoryService.delete(id).subscribe(() => {
      console.log("Deleted!");
      this.findAllCategory();
    });
  }
}
