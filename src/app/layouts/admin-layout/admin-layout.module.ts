import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ClientsComponent } from "src/app/features/presentation/clients/clients.component";
import { CategoryComponent } from "src/app/features/presentation/category/category.component";
import { FeedbackComponent } from "src/app/features/presentation/feedback/feedback.component";
import { ProductComponent } from "src/app/features/presentation/product/product.component";
import { CategoryDetailsComponent } from "src/app/features/presentation/category/category-details/category-details.component";
import { CategoryUpdatesComponent } from "src/app/features/presentation/category/category-updates/category-updates.component";
import { ClientsDetailsComponent } from "src/app/features/presentation/clients/clients-details/clients-details.component";
import { ClientsUpdatesComponent } from "src/app/features/presentation/clients/clients-updates/clients-updates.component";
import { FeedbackDetailsComponent } from "src/app/features/presentation/feedback/feedback-details/feedback-details.component";
import { FeedbackUpdatesComponent } from "src/app/features/presentation/feedback/feedback-updates/feedback-updates.component";
import { ProductDetailsComponent } from "src/app/features/presentation/product/product-details/product-details.component";
import { ProductUpdatesComponent } from "src/app/features/presentation/product/product-updates/product-updates.component";
import { CategoryRepository } from "src/app/features/core/repositories/category.repository";
import { CategoryServiceImpl } from "src/app/features/core/services/impl/category.service-impl";
import { ClientsRepository } from "src/app/features/core/repositories/clients.repository";
import { ClientsServiceImpl } from "src/app/features/core/services/impl/clients.service-impl";
import { FeedbackRepository } from "src/app/features/core/repositories/feedback.repository";
import { FeedbackServiceImpl } from "src/app/features/core/services/impl/feedback.service-impl";
import { ProductRepository } from "src/app/features/core/repositories/product.repository";
import { ProductServiceImpl } from "src/app/features/core/services/impl/product.service-impl";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ClientsComponent,
    ProductComponent,
    CategoryComponent,
    FeedbackComponent,
    ProductDetailsComponent,
    ProductUpdatesComponent,
    FeedbackUpdatesComponent,
    FeedbackDetailsComponent,
    ClientsUpdatesComponent,
    ClientsDetailsComponent,
    CategoryDetailsComponent,
    CategoryUpdatesComponent,
  ],

  providers: [
    { provide: CategoryServiceImpl },
    { provide: CategoryRepository, useClass: CategoryServiceImpl },
    { provide: ClientsRepository, useClass: ClientsServiceImpl },
    { provide: FeedbackRepository, useClass: FeedbackServiceImpl },
    { provide: ProductRepository, useClass: ProductServiceImpl },
  ],
})
export class AdminLayoutModule {}
