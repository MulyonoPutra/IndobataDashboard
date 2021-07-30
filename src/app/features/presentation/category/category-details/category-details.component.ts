import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/features/core/domain/entities/category';
import { CategoryService } from 'src/app/features/core/services/category.service';
import { CategoryRepository } from 'src/app/features/core/repositories/category.repository';

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.css"],
})
export class CategoryDetailsComponent implements OnInit {

  public category: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryRepository) {}

  ngOnInit(): void {
    this.getCategoryById();
  }

  getCategoryById(): void {
    let id = +this.route.snapshot.params["id"];
    this.categoryService.getCategoryById(id).subscribe((data: Category) => {
      this.category = data;
      console.log(data);
    });
  }
}
