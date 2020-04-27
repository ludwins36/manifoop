import { Injectable } from "@angular/core";
import { CacheService } from "ionic-cache";
import { ServiceService } from "./service.service";

@Injectable({
  providedIn: "root",
})
export class CacheServicesService {
  private keyCupons = "productos_cupons";
  private keyMesas = "productos_mesass";
  private keyGroup = "productos_stored";
  private keyPromos = "promociones_generales";
  private keyFeatured = "productos_destacados";
  private keyVendors = "restaurants-vendors";
  idCategory: any;

  constructor(public cache: CacheService, public service: ServiceService) {}

  public async getRestourans() {
    return await this.cache.getOrSetItem(
      this.keyVendors,
      () => this.getVendors(),
      this.keyGroup
    );
  }
  public async getCupons() {
    let idCupons = await this.cache.getOrSetItem(
      this.keyCupons,
      () => this.getIdCategoryCupons(),
      this.keyGroup
    );
    return await this.cache.getOrSetItem(
      String(idCupons),
      () => this.loadProductCategory(String(idCupons)),
      this.keyGroup
    );
  }

 
  public async getMesas() {
    let id = await this.cache.getOrSetItem(
      this.keyMesas,
      () => this.getIdCategoryMesas(),
      this.keyGroup
    );
    return await this.cache.getOrSetItem(
      String(id),
      () => this.loadProductCategory(String(id)),
      this.keyGroup
    );
  }

  public async getListProuctsCategory(id) {
    return this.cache.getOrSetItem(String(id), () =>
      this.loadProduct(id).then((val) => {
        console.log(val);
        return val;
      })
    );
  }

  public async getProuctsCategory(id) {
    let idCategory = await this.cache.getOrSetItem(
      String(id),
      () => this.getIdCategory(id),
      this.service.keyGroup
    );

    console.log(idCategory);

    return this.cache.getOrSetItem(
      String(this.idCategory),
      () => this.getCategories(String(idCategory)),
      this.service.keyGroup
    );
  }

  public async getProductPromos() {
    let idPromos = await this.cache.getOrSetItem(
      this.keyPromos,
      () => this.getIdCategoryPromociones(),
      this.keyGroup
    );
    return await this.cache.getOrSetItem(
      String(idPromos),
      () => this.loadProductCategory(String(idPromos)),
      this.keyGroup
    );
  }

  public async getFeaturedProduct() {
    return await this.cache.getOrSetItem(
      this.keyFeatured,
      () => this.loadProductFeatured(),
      this.keyGroup
    );
  }

  private async loadProduct(id) {
    return await this.service.Woocommerce.getAsync(
      "products?category=" + id
    ).then((catSecon) => {
      return JSON.parse(catSecon.body);
    });
  }

  private async getIdCategory(id) {
    return this.service.Woocommerce.getAsync(
      "products/categories?slug=" + id
    ).then((cat) => {
      let data = JSON.parse(cat.body);
      return data[0].id;
    });
  }

  private async getIdCategoryCupons() {
    return await this.service.Woocommerce.getAsync(
      "products/categories?slug=cupones"
    ).then((catSecon) => {
      let data = JSON.parse(catSecon.body);
      return data[0].id;
    });
  }

  private async getIdCategoryMesas() {
    return await this.service.Woocommerce.getAsync(
      "products/categories?slug=mesas"
    ).then((catSecon) => {
      let data = JSON.parse(catSecon.body);
      return data[0].id;
    });
  }

  private async getCategories(id) {
    return this.service.Woocommerce.getAsync(
      "products/categories?parent=" + id
    ).then((categories) => {
      console.log(JSON.parse(categories.body));

      return JSON.parse(categories.body);
    });
  }

  private async loadProductCategory(id) {
    return await this.service.Woocommerce.getAsync(
      "products?category=" + id
    ).then((catSecon) => {
      return JSON.parse(catSecon.body);
    });
  }

  public async loadProductRestaurant(id) {
    return await this.cache.loadFromObservable(String(id), this.service.getProductsOfRestaurant(id));
    
  }

  public async loadOrders(id) {
    return await this.cache.loadFromObservable(String(id), this.service.getProductsOfRestaurant(id));
    
  }


  private async loadProductFeatured() {
    return await this.service.Woocommerce.getAsync(
      "products?featured=true"
    ).then((catSecon) => {
      return JSON.parse(catSecon.body);
    });
  }

  private async getVendors() {
    return await this.service.Woocommerce.getAsync(
      "customers?role=wcfm_vendor&per_page=100"
    ).then((data) => {
      return JSON.parse(data.body);
    });
  }

  private async getIdCategoryPromociones() {
    return await this.service.Woocommerce.getAsync(
      "products/categories?slug=promos"
    ).then((catSecon) => {
      let data = JSON.parse(catSecon.body);
      return data[0].id;
    });
  }
}
