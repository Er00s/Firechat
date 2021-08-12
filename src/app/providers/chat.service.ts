import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Mensaje } from '../interface/mensaje.interface';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje> | undefined;
  
  public chats: Mensaje[] = [];

  public usuario: any = {};

  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {


    this.auth.authState.subscribe(user => {
      console.log('estado del usuario', user);

      if (!user){
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid= user.uid;
    })
   }

   login(proveedor:string) {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    //seteamos el this.usuario para borrar los datos cargados por el loggin
    this.usuario = {};
    this.auth.signOut();
  }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                                         .limit(5));

     return this.itemsCollection.valueChanges().pipe(
                             map((mensajes: Mensaje[]) =>{
                                console.log(mensajes); 

                                  this.chats=[]; 
                                  for (let mensaje of mensajes){
                                    this.chats.unshift(mensaje);
                                  } 
                                   return this.chats;
                             })
     )
  }
   
  agregarMensaje( texto: string ){
     
    //TODO falta el UID del usuario 
    let mensaje: Mensaje={
      nombre: this.usuario.nombre,
      mensaje: texto,
       fecha: new Date().getTime(),
       uid:this.usuario.uid
    }
    //esta funcion agrega los datos de mensaje a el firebase 
    //con el return puedo hacer el then o el catch en cualquier lado qeu yo llame la funcion 
     return this.itemsCollection?.add(mensaje);
  }

   

}
