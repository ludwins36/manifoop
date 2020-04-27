import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { CategoriesPage } from "./categories.page";
import { ComponentsModule } from "src/app/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: CategoriesPage,
    children: [
      {
        path: "menu",
        children: [
          {
            path: "",
            loadChildren: "../menu/menu.module#MenuPageModule"
          }
        ]
      },
      {
        path: "promociones",
        children: [
          {
            path: "",
            loadChildren:
              "../promociones/promociones.module#PromocionesPageModule"
          }
        ]
      },
      // {
      //   path: "",
      //   redirectTo: "//menu",
      //   pathMatch: "full"
      // }
    ]
  },
  // {
  //   path: "",
  //   redirectTo: "///menu",
  //   pathMatch: "full"
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
