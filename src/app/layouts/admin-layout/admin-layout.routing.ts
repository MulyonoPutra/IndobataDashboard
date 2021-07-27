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

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "clients", component: ClientsComponent },
  { path: "product", component: ProductComponent },
  { path: "category", component: CategoryComponent },
  { path: "feedback", component: FeedbackComponent },
];
