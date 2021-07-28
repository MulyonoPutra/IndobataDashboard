import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { ClientsComponent } from './../../features/presentation/clients/clients.component';
import { ProductComponent } from "src/app/features/presentation/product/product.component";
import { CategoryComponent } from "src/app/features/presentation/category/category.component";
import { FeedbackComponent } from "src/app/features/presentation/feedback/feedback.component";
import { ClientsUpdatesComponent } from "src/app/features/presentation/clients/clients-updates/clients-updates.component";
import { ClientsDetailsComponent } from "src/app/features/presentation/clients/clients-details/clients-details.component";
import { ProductUpdatesComponent } from "src/app/features/presentation/product/product-updates/product-updates.component";
import { ProductDetailsComponent } from "src/app/features/presentation/product/product-details/product-details.component";
import { CategoryUpdatesComponent } from "src/app/features/presentation/category/category-updates/category-updates.component";
import { CategoryDetailsComponent } from "src/app/features/presentation/category/category-details/category-details.component";
import { FeedbackUpdatesComponent } from "src/app/features/presentation/feedback/feedback-updates/feedback-updates.component";
import { FeedbackDetailsComponent } from "src/app/features/presentation/feedback/feedback-details/feedback-details.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  
  { path: "clients", component: ClientsComponent },
  { path: "clients-update", component: ClientsUpdatesComponent },
  { path: "clients-details", component: ClientsDetailsComponent },

  { path: "product", component: ProductComponent },
  { path: "product-update", component: ProductUpdatesComponent },
  { path: "product-details", component: ProductDetailsComponent },

  { path: "category", component: CategoryComponent },
  { path: "category-update", component: CategoryUpdatesComponent },
  { path: "category-details", component: CategoryDetailsComponent },

  { path: "feedback", component: FeedbackComponent },
  { path: "feedback-update", component: FeedbackUpdatesComponent },
  { path: "feedback-details", component: FeedbackDetailsComponent },
];
