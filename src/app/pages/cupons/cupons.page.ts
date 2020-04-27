import { Component, OnInit } from "@angular/core";
import { CacheService } from "ionic-cache";
import { ServiceService } from "src/app/services/service.service";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { CacheServicesService } from "src/app/services/cache-services.service";
import { Dialogs } from "@ionic-native/dialogs/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-cupons",
  templateUrl: "./cupons.page.html",
  styleUrls: ["./cupons.page.scss"]
})
export class CuponsPage implements OnInit {
  public producCupons: any = [];
  public id: any;
  qr: any;
  elementType: any = 'canvas';
  value : any = 'Hola';

  constructor(
    private cache: CacheService,
    public service: ServiceService,
    private qrScanner: QRScanner,
    private cacheService: CacheServicesService,
    private dialogs: Dialogs,
    public platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(0, () => {});
  }

  async ngOnInit() {
    await this.cacheService.getCupons().then(rest => {
      console.log(rest);
      this.producCupons = rest;

    });
  }

  // scanQr(cats) {
  //   this.qrScanner
  //     .prepare()
  //     .then((status: QRScannerStatus) => {
  //       if (status.authorized) {
  //         // camera permission was granted
  //         // start scanning
  //         // let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //         //   console.log("Scanned something", text);

  //         //   this.qrScanner.hide(); // hide camera preview
  //         //   scanSub.unsubscribe(); // stop scanning
  //         // });
  //         this.qrScanner.show();
  //         document.getElementsByTagName("body")[0].style.opacity = "0";
  //         this.qr = this.qrScanner.scan().subscribe(
  //           texFount => {
  //             document.getElementsByTagName("body")[0].style.opacity = "1";
  //             this.qr.unsubscribe();
  //             this.dialogs.alert(texFount);
  //           },
  //           error => {
  //             this.dialogs.alert(JSON.stringify(error));
  //           }
  //         );
  //       } else if (status.denied) {
  //         alert("sin permiso");

  //         // camera permission was permanently denied
  //         // you must use QRScanner.openSettings() method to guide the user to the settings page
  //         // then they can grant the permission from there
  //       } else {
  //         alert("permiso denegado");
  //         // permission was denied, but not permanently. You can ask for permission again at a later time.
  //       }
  //     })
  //     .catch((e: any) => console.log("Error is", e));
  //   alert("error ");
  //   // this.barcodeScanner
  //   //   .scan()
  //   //   .then(barcodeData => {
  //   //     alert("Barcode data " + JSON.stringify(barcodeData));
  //   //   })
  //   //   .catch(err => {
  //   //     console.log("Error", err);
  //   //   });
  // }
}
