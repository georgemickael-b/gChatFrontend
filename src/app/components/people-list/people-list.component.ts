import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/shared-services/api.service';
import { User } from '../user.model';
import { ChatService } from 'src/app/shared-services/chat.service';
import { UserService } from 'src/app/shared-services/user.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html'
})
export class PeopleList implements OnInit {
    public people: Array<User>;
    constructor(private api: APIService, private chatService: ChatService,private userService : UserService) {
    }
    public  ngOnInit() {
        let me = this.userService.me
       this.chatService.people.subscribe((people)=>{
           this.people = people;
       })
    }

    public onPeopleListItemClick(user) {
        this.api.getChat(user._id).subscribe((response) => {
            let chat = response.data;
            this.chatService.setChat(chat);
        })
    }
}
