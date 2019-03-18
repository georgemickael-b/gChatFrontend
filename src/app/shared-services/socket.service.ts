import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { UserService } from './user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';



    @Injectable()
    export class SocketService {
        private socket;
        private baseSockerUrl;
        public incomingMessage = new BehaviorSubject<any>(null);
        public incomingChat = new BehaviorSubject<any>(null);
        public incomingPeople = new BehaviorSubject<any>(null);
        public updateMessage = new BehaviorSubject<any>(null);
        constructor(private userService : UserService){
            this.baseSockerUrl= environment.socketUrl;
        }

        public  initSocket() {
            this.socket =  io.connect(this.baseSockerUrl, { query : "userId="+this.userService.me._id });
            this.initOnMessage()
            this.initOnChat()
            this.initOnPeople()
        }

        public send(message: any): void {
            this.socket.emit('message', message);
        }

        public initOnMessage(){
            this.socket.on('message', (data: any) =>{
                this.incomingMessage.next(data);
            });
            this.socket.on('messageupdate', (data: any) =>{
                this.updateMessage.next(data);
            });
        }

        public initOnChat(){
            this.socket.on('chat', (data: any) =>{
                this.incomingChat.next(data);
            });
        }

        public initOnPeople(){
            this.socket.on('people', (data: any) =>{
                this.incomingPeople.next(data);
            });
        }
    }
