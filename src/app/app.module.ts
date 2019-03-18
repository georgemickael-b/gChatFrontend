import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { APIService } from './shared-services/api.service';
import { PeopleList } from './components/people-list/people-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUIModule } from './materialUI.module';
import { ChatService } from './shared-services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatList } from './components/chat-list/chat-list.component';
import { Sidebar } from './layout/sidebar/sidebar.component';
import { UserService } from './shared-services/user.service';
import { ChatArea } from './components/chat-area/chat-area.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MessageArea } from './components/message-area/message-area.component';
import { SocketService } from './shared-services/socket.service';
import { Login } from './components/login/login.component';
import { Main } from './layout/main/main.component';
import { Header } from './layout/header/header.component';

@NgModule({
  declarations:
    [
      PeopleList,
      ChatList,
      Sidebar,
      ChatArea,
      MessageArea,
      Login,
      Header,
      Main,
      AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    MatSidenavModule,
    FormsModule
  ],
  providers: [APIService, ChatService,UserService,SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
