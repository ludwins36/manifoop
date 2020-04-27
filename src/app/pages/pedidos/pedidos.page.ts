import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Storage } from "@ionic/storage";
import { CacheServicesService } from 'src/app/services/cache-services.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  listPedidos: any = [];
  user : any; 
  listProducts: any = [];
  constructor(public service: ServiceService, private storage: Storage, private cache: CacheServicesService) { 
    this.storage.get('user').then(user => {

      this.service.getOrdersOfUser(user.id).subscribe(data => {
        this.listProducts = data;
        console.log(data);
      });
    });
    
  } 

  ngOnInit() {

  }

}
