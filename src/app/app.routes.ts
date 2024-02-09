import { Routes } from '@angular/router';
import { MainLayoutComponent } from "./common/main-layout/main-layout.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { CartPageComponent } from "./cart-page/cart-page.component";
import { AdminLayoutComponent } from "./admin/common/admin-layout/admin-layout.component";
import { LoginPageComponent } from "./admin/login-page/login-page.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { AddPageComponent } from "./admin/add-page/add-page.component";
import { OrdersPageComponent } from "./admin/orders-page/orders-page.component";
import { EditPageComponent } from "./admin/edit-page/edit-page.component";

export const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', component: MainPageComponent},
      { path: 'product/:id', component: ProductPageComponent },
      { path: 'cart',  component: CartPageComponent}
    ]
  },

  {
    path: 'admin', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch:'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'add', component: AddPageComponent},
      {path: 'orders', component: OrdersPageComponent},
      {path: 'product/:id/edit', component: EditPageComponent},
    ]
  }
];


