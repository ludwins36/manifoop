import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.page.html',
  styleUrls: ['./cupon.page.scss'],
})
export class CuponPage implements OnInit {
  elementType: any = 'url';
  value : any ;
  constructor(private router : ActivatedRoute) {
    this.router.params.subscribe(async params => {
      this.value = params.id;


    });
   }

  ngOnInit() {
  }

}
