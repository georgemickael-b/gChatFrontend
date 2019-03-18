import { Component, OnInit, Input } from '@angular/core';
import { APIService } from 'src/app/shared-services/api.service';
import { ChatService } from 'src/app/shared-services/chat.service';
import { UserService } from 'src/app/shared-services/user.service';

@Component({
    selector: 'app-message-area',
    templateUrl: './message-area.component.html'
})
export class MessageArea implements OnInit {
    loading = true;
    message = "";
    chat
    constructor(private api: APIService, private chatService: ChatService, private userService: UserService) {
    }
    public ngOnInit() {
        this.chatService.currentChat.subscribe((chat) => {
            this.chat = chat;
        })
    }
    sendMessage() {
        this.chatService.currentChat.subscribe((chat) => {
            this.api.sendMessage(this.message, chat._id).subscribe((response) => {
                this.message = ""
            })
        })
    }
}
