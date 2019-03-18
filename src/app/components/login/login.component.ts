import { Component, OnInit, Input } from '@angular/core';
import { APIService } from 'src/app/shared-services/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class Login implements OnInit {
    constructor(private api: APIService) {
    }
    public ngOnInit() {
    }
    sendMessage() {
    }
}
