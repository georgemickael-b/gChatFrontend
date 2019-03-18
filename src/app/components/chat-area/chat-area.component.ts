import { Component, OnInit, OnChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { APIService } from 'src/app/shared-services/api.service';
import { ChatService } from 'src/app/shared-services/chat.service';
import { UserService } from 'src/app/shared-services/user.service';
import { MessageBundle } from '@angular/compiler';

@Component({
    selector: 'app-chat-area',
    templateUrl: './chat-area.component.html'
})
export class ChatArea implements OnInit,AfterViewChecked{
    partner
    loading = true;
    messages = [];
    me
    @ViewChild('container') container: ElementRef;

    constructor(private api: APIService, private chatService: ChatService, private userService: UserService) {
    }
    public ngOnInit() {
        this.me = this.userService.me
        this.chatService.currentChat.subscribe((chat) => {
            this.loading = true;
            if (chat) {
                this.partner = chat.members.find((member) => member._id != this.me._id)
                this.chatService.messagesOfCurrentChat.subscribe((messages)=>{
                    this.messages =  messages;
                    console.log("chat area called",messages)
                    this.loading = false;
                })
            }
        })
    }

    ngAfterViewChecked(){
        try {
          this.container.nativeElement.scrollIntoView();
          }catch(err){}
      }

    isMessageMine(message){
        return message.sender == this.me._id
    }
    formatDate(date){
        return new Date(date).toLocaleTimeString()
    }
}
