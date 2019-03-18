import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable()
export class UserService {
    public me : any;
    constructor(private api : APIService) {
    }
    async getMe(){
        try{  
         let response  = await this.api.getMe().toPromise();
         this.me = response.data;
        }
        catch(error){
            console.log("Unable to fetch your details.")
        }
    }
}