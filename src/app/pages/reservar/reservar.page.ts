import { Component, OnInit } from '@angular/core';
import { CacheServicesService } from 'src/app/services/cache-services.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
})
export class ReservarPage implements OnInit {
  mesas : any = [];
  mesa: any;


  constructor(private cache: CacheServicesService, public alet: AlertController, public routeActive: Router) {
    this.cache.getMesas().then(mesas => {
      console.log(mesas);
      this.mesas = mesas;
    })
   }

  ngOnInit() {

   
  }

  reservar(){
    if(this.mesa){
      this.getAlert('Reservación exitosa');
    }else{
      alert('Debe escoger una mesa');

    }

  }

  async getAlert(message) {
    const alert = await this.alet.create({
      header: "Alerta",
      subHeader: "Información de pedido",
      message: message,
      buttons: [
        {
          text: "Aceptar",
          handler: () => {
            this.routeActive.navigate(["/inicio"]);
          }
        }
      ]
    });

    await alert.present();
  }

}
