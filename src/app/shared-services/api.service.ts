import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from "../../environments/environment"



@Injectable()
export class APIService {
    private headers: HttpHeaders;
    private httpArgs: any;
    private baseUrl;
    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiUrl;
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
        this.httpArgs = {
            headers: this.headers,
            withCredentials: true
        };
    }

    get(path) {
        return this.http.get(this.baseUrl + path, this.httpArgs).pipe(catchError(this.handleError))
    }
    post(path, body) {
        return this.http.post(this.baseUrl + path, body, this.httpArgs).pipe(catchError(this.handleError))
    }
    put(path, body) {
        return this.http.put(this.baseUrl + path, body, this.httpArgs).pipe(catchError(this.handleError))
    }

    getMe = (): Observable<any> => {
        return this.get("/user/me")
    };

    getAllUsers = (): Observable<any> => {
        return this.get("/users")
    };

    getChat = (partnerId): Observable<any> => {
        return this.post("/chat", { partnerId })
    };

    getMyChats = (): Observable<any> => {
        return this.get("/chats")
    };

    getMessagesOfChat = (chatId): Observable<any> => {
        return this.post("/message", { chatId })
    };

    sendMessage = (message, chatId): Observable<any> => {
        return this.post("/message/send", { message, chatId });
    };
    
    seenMessage = (messageId): Observable<any> => {
        return this.put("/message/seen", { messageId });
    };

    logout = () : Observable<any> => {
        return this.get("/logout")
    }

    /* Common Error Handling for all Api Calls*/
    private handleError = (error) => {
        console.log(error)
        return throwError(error)
    }
}