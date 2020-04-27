import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServiceService } from "src/app/services/service.service";
import { CacheService } from "ionic-cache";

@Component({
  selector: "app-products",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"]
})
export class ProductsPage implements OnInit {
  id: any;
  productsList: any;
  description: any;
  categoryList: any;
  params: any = {};
  items: any;
  restaurantName: any;
  owner_id: any;
  cat_id: any;
  img: any;
  loading: any;
  title: any;
  catTitle: any;
  desc: any;
  key: "product-data";

  constructor(
    private route: ActivatedRoute,
    public service: ServiceService,
    private cache: CacheService
  ) {
    this.route.params.subscribe(async params => {
      this.id = params.id;
      this.description = params.description,
      this.title = params.title;
      this.owner_id = params.owner_id;
      this.cat_id = params.cat_id;
      this.img = params.img;
      this.catTitle = params.catTitle;
      this.desc = params.desc;
      this.productsList = await this.cache.getOrSetItem(String(params.id) + "product", () => this.loadProduct(params.cat_id));
 

     
    });
  }

  async loadProduct(id) {
    return await this.service.Woocommerce.getAsync("products?category=" + id).then(
      catSecon => {
        return JSON.parse(catSecon.body);
      }
    );
  }

  
  ngOnInit() {}
}
