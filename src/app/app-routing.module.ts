import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "inicio",
    loadChildren: "./pages/inicio/inicio.module#InicioPageModule"
  },
  {
    path: "register",
    loadChildren: "./pages/register/register.module#RegisterPageModule"
  },
  {
    path: "action-sheet",
    loadChildren:
      "./pages/action-sheet/action-sheet.module#ActionSheetPageModule"
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "categories",
    loadChildren: "./pages/categories/categories.module#CategoriesPageModule"
  },
  {
    path: "products",
    loadChildren: "./pages/products/products.module#ProductsPageModule"
  },
  {
    path: "profile",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule"
  },
  {
    path: "product-detail",
    loadChildren:
      "./pages/product-detail/product-detail.module#ProductDetailPageModule"
  },
  { path: "cart", loadChildren: "./pages/cart/cart.module#CartPageModule" },
  {
    path: "checkout",
    loadChildren: "./pages/checkout/checkout.module#CheckoutPageModule"
  },
  {
    path: "address",
    loadChildren: "./pages/address/address.module#AddressPageModule"
  },
  {
    path: "qrscanner",
    loadChildren: "./pages/qrscanner/qrscanner.module#QrscannerPageModule"
  },
  {
    path: "cupons",
    loadChildren: "./pages/cupons/cupons.module#CuponsPageModule"
  },
  { path: "terms", loadChildren: "./pages/terms/terms.module#TermsPageModule" },
  { path: "help", loadChildren: "./pages/help/help.module#HelpPageModule" },
  {
    path: "pedidos",
    loadChildren: "./pages/pedidos/pedidos.module#PedidosPageModule"
  },
  {
    path: "profile-edit",
    loadChildren:
      "./pages/profile-edit/profile-edit.module#ProfileEditPageModule"
  },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'promociones', loadChildren: './pages/promociones/promociones.module#PromocionesPageModule' },
  { path: 'cupon', loadChildren: './pages/cupon/cupon.module#CuponPageModule' },
  { path: 'reservar', loadChildren: './pages/reservar/reservar.module#ReservarPageModule' },
  { path: 'membresia', loadChildren: './pages/membresia/membresia.module#MembresiaPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
