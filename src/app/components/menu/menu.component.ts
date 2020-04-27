import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import { Componente } from "../../interfaces/interfaces";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core"; // add this
import { Events, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Values } from "src/app/shared/values.class";
import { AuthService } from "src/app/services/auth.service";
import { CacheService } from "ionic-cache";
import { CacheServicesService } from "src/app/services/cache-services.service";

import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  componentesAccount: Observable<Componente[]>;
  componentesInfo: Observable<Componente[]>;
  user: any;
  promosList: any;
  lastCupon: any;
  promo: any;

  constructor(
    private dataService: ServiceService,
    private translate: TranslateService,
    public events: Events,
    private router: Router,
    private storage: Storage,
    private cache: CacheService,
    private qrScanner: QRScanner,
    public menuCtrl: MenuController,
    public values: Values,
    private cacheService: CacheServicesService,

    // private barcodeScanner: BarcodeScanner,
    public usersProv: AuthService
  ) {
    let userLang = navigator.language.split("-")[0];
    userLang = /(english|deutsch)/gi.test(userLang) ? userLang : "english";
    this.translate.use(userLang);

    this.events.subscribe("user: change", (user) => {
      if (user || user != null) {
        console.log("userchange");
        console.log(user);
        this.user = user;
      }
    });

    this.storage.ready().then(() => {
      this.storage.get("user").then((val) => {
        console.log(val);
        if (val != null) {
          this.user = val;
        }
      });
    });
  }

  async ngOnInit() {
    this.componentesAccount = this.dataService.getMenuOptions();
    this.componentesInfo = this.dataService.getMenuOptionsInfo();
    this.promosList = await this.cacheService.getProductPromos();
    this.promo = this.promosList[0];

    console.log(this.promo);
  }

  logout() {
    this.storage.remove("user");
    this.user = null;
    this.storage.remove("cart_list");
    this.router.navigateByUrl("/login");
    this.menuCtrl.enable(false);
  }
}
