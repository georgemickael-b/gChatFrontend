import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/shared-services/api.service';
import { User } from '../user.model';
import { UserService } from 'src/app/shared-services/user.service';
import { ChatService } from 'src/app/shared-services/chat.service';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html'
})
export class ChatList implements OnInit {
    public chats: Array<User>;
    constructor(private api: APIService,private userService : UserService,private chatService : ChatService) {
    }
    public ngOnInit() {
        let me = this.userService.me;
        this.chatService.chats.subscribe((chats)=>{
            this.chats = chats.map((chat)=>{
                let partner = chat.members.find((member) => member._id !== me._id)
                return {...chat,partner}
            })
            console.log(this.chats)
        })
    }
    public onChatListItemClick(chat) {
        console.log(chat);
        this.chatService.setChat(chat);
    }
}
