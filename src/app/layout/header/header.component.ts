import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { APIService } from 'src/app/shared-services/api.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class Header implements OnInit {
  constructor(private api : APIService,private router : Router){
  }
  ngOnInit(){
  }
  logout(){
      this.api.logout().subscribe((data)=>{
        this.router.navigateByUrl('/');
      },(e)=>{
        this.router.navigateByUrl('/');
      })
  }
}
