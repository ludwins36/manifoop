import { Component, OnInit } from "@angular/core";
import { CacheService } from "ionic-cache";
import { ServiceService } from "src/app/services/service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { CacheServicesService } from "src/app/services/cache-services.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  productsList: any = [];
  listCategories: any;

  constructor(
    private cache: CacheServicesService,
    private storage: Storage,
    public service: ServiceService,
    private route: Router
  ) {
    this.storage.get("id_product").then(id => {
      console.log(id);
      this.cache.getProuctsCategory(id).then(cat => {

        cat.forEach(element => {
          this.cache.getListProuctsCategory(element.id).then(val => {
            console.log(val);
            if (val.length > 0) {
              val.forEach(pro => {
                this.productsList.push(pro);

                console.log(this.productsList);
              });
            }
          });
        });
        this.listCategories = cat;
      });
    });
    // this.storage.get("products").then(produts => {
    //   console.log(produts);
    //   produts.forEach(element => {
    //     this.loadProduct(element.id).then(val => {
    //       if(val.length > 0){
    //         val.forEach(pro =>{
    //           this.productsList.push(pro);
    //         })
    //         console.log( this.productsList);
    //       }
    //     });
    //   });
    //   this.listCategories = produts;
    // });
  }

  getDescription(val, div){
    var content = document.createTextNode(val);
    div.appendChild(content);
    
  }

  async ngOnInit() {
    
    // this.cache.getProuctsCategory().then(cat =>{

    //   cat.forEach(element => {
    //     this.loadProduct(element.id).then(val => {
    //       console.log(val);
    //       if(val.length > 0){
    //         val.forEach(pro =>{
    //           this.productsList.push(pro);

    //           console.log( this.productsList);
    //         })

    //       }

    //     });
    //   })

    // }).catch(err => {
    //   console.log(err);
    //   this.route.navigateByUrl("inicio");
    // })

    // this.productsList = await this.cache.getOrSetItem(String(params.id) + "product", () => this.loadProduct());
  }

  async loadProduct(id) {
    return await this.service.Woocommerce.getAsync(
      "products?category=" + id
    ).then(catSecon => {
      return JSON.parse(catSecon.body);
    });
  }
}
