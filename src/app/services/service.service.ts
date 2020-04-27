import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Componente } from "src/app/interfaces/interfaces";
import { User } from "../shared/user.class";
import * as WC from "woocommerce-api";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { CacheValueFactory } from 'ionic-cache';

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  public keyVendors = "restaurants-vendors";
  public keyBebidas = "restaurants-bebidas";
  public keyAdicionales = "restaurants-adicionales";
  public keyPromos = "promociones_generales";
  public keyCupons = "productos_cupons";
  public keyFeatured = "productos_destacados";
  public keyGroup = "productos_stored";
  public restaurantUserInfo: any;
  public restaurants: any;
  public restaurant: any;
  public chats: any;
  public category: any;
  public restaurantCategory: any;
  public restaurantItems: any;
  public items: any;
  public url: any;
  public consumerKey: any;
  public consumerSecret: any;
  public Woocommerce: any;
  public address: any;
  user: string;
  pass: string;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.user = "Admint";
    this.pass = "Colombia2020!";
    this.url = "https://mimapi.club";
    this.consumerKey = "ck_a36ffd8a2b5ed5df6c7bb0bc607c2370cd9c5060";
    this.consumerSecret = "cs_4039f7c013c9a1a1ceec5f845efa6067637e1416";
    const header = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Methods" : "*"
    });

    this.Woocommerce = WC({
      url: this.url,
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret,
      wpAPI: true,
      version: "wc/v3",
      headers: header,
    });
  }
  httpOption = {
    headers: new HttpHeaders({
      Authorization: "Basic " + "QWRtaW50OkNvbG9tYmlhMjAyMCE",
    }),
  };

  getRestaurantUserProfile(id): any {
    return this.restaurantUserInfo.child(id);
  }

  getItemLists(id) {
    console.log(id);
    this.restaurantItems = this.items.orderByChild("categories").equalTo(id);
    return this.restaurantItems;
  }

  getMenuOptions() {
    return this.http.get<Componente[]>("/assets/data/menu.json");
  }
  getMenuOptionsInfo() {
    return this.http.get<Componente[]>("/assets/data/menuInfo.json");
  }

  getProductsOfRestaurant(id) {
    return this.http.get(this.url + '/wp-json/wcfmmp/v1/products/autor/' + id, this.httpOption);
  }

  getOrdersOfUser(id) {
    return this.http.get(this.url + '/wp-json/wcfmmp/v1/orders/customer/' + id, this.httpOption);
  }

  getRestaurantsList(): any {
    console.log(this.restaurants);
    return this.restaurants;
  }

  getRestaurantId(id) {
    return this.restaurants.child(id);
  }

  getUserProfile(id): any {
    return this.restaurantUserInfo.child(id);
  }

  getRestaurantCategoryLists(id) {
    console.log(id);
    this.category = this.restaurantCategory
      .orderByChild("res_name")
      .equalTo(id);
    return this.category;
  }

  getProducts() {
    return `${this.url}/wp-json/wcfmmp/v1/products?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  }
}
