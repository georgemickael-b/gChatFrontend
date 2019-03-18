import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared-services/chat.service';
import { UserService } from 'src/app/shared-services/user.service';
import { SocketService } from 'src/app/shared-services/socket.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html'
})
export class Main implements OnInit {
  loading = true;
  constructor(private chatService : ChatService,private userService : UserService,private socketService : SocketService){
  }
  async ngOnInit(){
    await this.userService.getMe()
    this.socketService.initSocket();
    await this.chatService.init()
    this.loading = false;
  }

}
