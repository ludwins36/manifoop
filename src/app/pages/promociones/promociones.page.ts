import { Component, OnInit } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { ServiceService } from 'src/app/services/service.service';
import { CacheServicesService } from 'src/app/services/cache-services.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit {
  promosList: any = [];

  constructor(private cache: CacheServicesService,  public service: ServiceService) { }

  async ngOnInit() {
    
    await this.cache.getProductPromos().then(promos => {
      this.promosList = promos;
    });
  }

}
