import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';


import { environment } from '../environments/environment';
import { ChatComponent } from './components/chat/chat.component';

import { ChatService } from './providers/chat.service';



@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
   AngularFirestoreModule,
    FormsModule,

  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
