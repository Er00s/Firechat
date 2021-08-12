import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'firechat';

  public chats: Observable<any[]>; 

  constructor(firestore: AngularFirestore,
    public _cs: ChatService){
    this.chats=firestore.collection('chats').valueChanges();
  }
}
