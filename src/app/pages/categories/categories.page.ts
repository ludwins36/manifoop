import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServiceService } from "src/app/services/service.service";
import { CacheService } from "ionic-cache";
import { Observable } from "rxjs/internal/Observable";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";

import { LoadingController, ActionSheetController } from "@ionic/angular";
import { CacheServicesService } from 'src/app/services/cache-services.service';
// import { TabsPage } from "./tabs.page";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"]
})
export class CategoriesPage implements OnInit {
  id: Number;
  shopt: any;
  productsList: any;
  categoryList: any;
  params: any = {};
  title: any;
  catId: any;
  description: any;
  owner_id: any;
  items: any = {};
  subCategoryListCache: any;
  subCategoryList: any;
  promosList: any = [];
  featuredList: any = [];

  loading: any;
  img: any;
  constructor(
    private route: ActivatedRoute,
    public service: ServiceService,
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private cache: CacheServicesService,
    public actionSheet: ActionSheetController,
    public routeActive: Router,
    public cacheService: CacheService
  ) {

    this.route.params.subscribe(async params => {
      console.log(params);
      this.id = Number(params.id);
      this.title = params.title;
      this.description = params.description;
      this.img = params.img;
      this.presentLoading();
      (await this.cache.loadProductRestaurant(params.id)).subscribe(data => {
        this.categoryList = data;
        console.log(data);

      });

    });
  }

  // async presentActionSheet() {
  //   let buttons = [];

  //   this.categoryList.forEach(cat => {
  //     let data = {
  //       text: cat.name,
  //       cssClass: "custom-ionic",
  //       icon: "arrow-dropright",
  //       handler: () => {
  //         this.routeActive.navigate([
  //           "/products",
  //           {
  //             id: this.id,
  //             title: this.title,
  //             description: this.description,
  //             cat_id: cat.id,
  //             catTitle: cat.name
  //           }
  //         ]);
  //       }
  //     };

  //     buttons.push(data);
  //   });

  //   const actionSheet = await this.actionSheet.create({
  //     header: "Platos",
  //     buttons: buttons
  //   });
  //   await actionSheet.present();
  // }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Cargando",
      duration: 1000
    });

    return await this.loading.present();
  }

  async ngOnInit() {
    this.storage.set("id_product", this.id);
  }

 
}
