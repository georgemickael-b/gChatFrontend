import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { SocketService } from './socket.service';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class ChatService {
    public currentChat = new BehaviorSubject<any>(null);
    public messagesOfCurrentChat = new BehaviorSubject<Array<any>>([]);
    public people = new BehaviorSubject<Array<any>>([]);
    public chats = new BehaviorSubject<Array<any>>([]);
    private me;

    constructor(private api: APIService, private userService: UserService, private socketService: SocketService, private snackBar: MatSnackBar) {
        this.me = userService.me;
        this.initListenForMessage()
        this.initListenForChat()
        this.initListenForPeople()
        this.initListenForMessageUpdate()
    }
    setChat(chat) {
        this.currentChat.next(chat)
        this.api.getMessagesOfChat(chat._id).subscribe((response) => {
            console.log(response)
            this.messagesOfCurrentChat.next(response.data);
        })
    }

    initListenForMessage() {
        this.socketService.incomingMessage.subscribe((message) => {
            let currentChat = this.currentChat.getValue();
            if (!currentChat) {
                if (message) {
                    let senderId = message.sender;
                    let people = this.people.getValue()
                    let senderName = people.find((user)=> user._id == senderId).name
                    this.showAlert("You got a new message " + senderName)
                }
                return
            }
            if (currentChat._id == message.chat) {
                this.messagesOfCurrentChat.next([...this.messagesOfCurrentChat.getValue(), message])

                if (message.sender != this.userService.me._id) {
                    this.api.seenMessage(message._id).subscribe((response) => {

                    })
                }
            }
        })
    }
    initListenForMessageUpdate() {
        this.socketService.updateMessage.subscribe((message) => {
            let currentChat = this.currentChat.getValue();
            if (!currentChat)
                return
            if (currentChat._id == message.chat) {
                let msgs = [...this.messagesOfCurrentChat.getValue()]
                let msgIdx = msgs.findIndex((m) => m._id == message._id)
                msgs[msgIdx] = JSON.parse(JSON.stringify(message));
                this.messagesOfCurrentChat.next([...msgs])
            }
        })
    }
    initListenForChat() {
        this.socketService.incomingChat.subscribe((chat) => {
            this.showAlert("You got a new chat request. Check chats tab")
            this.chats.next([...this.chats.getValue(), chat])
        })
    }

    initListenForPeople() {
        this.socketService.incomingPeople.subscribe((user) => {

            let peopleStored = this.people.getValue();
            let userExists = peopleStored.find((p) => p._id == user._id)
            if (!userExists) {
                this.people.next([...this.people.getValue(), user])
                this.showAlert("New User Joined G Chat. ")
            }
        })
    }

    async init() {
        let peopleResponse: any = await this.api.getAllUsers().toPromise()
        this.people.next(this.filterMeFromPeople(peopleResponse.data))

        let chatResponse: any = await this.api.getMyChats().toPromise()
        this.chats.next(chatResponse.data.chats)
    }

    filterMeFromPeople(people) {
        return people.filter((user) => user._id != this.userService.me._id)
    }

    showAlert(message) {
        this.snackBar.open(message, "OK", {
            duration: 2000,
        });
    }
}