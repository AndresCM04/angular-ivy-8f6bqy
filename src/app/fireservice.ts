import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { libro } from './libros';

@Injectable()
export class FireService {
  /************
   * VARIABLES QUE REPRESENTAN LAS
   * COLECCIONES DE LA BD
   ************/
  private COLLECT_BOOKS: string = 'libros';

  /******
   * ATRIBUTOS
   *****/
  private booksCollection: AngularFirestoreCollection<libro>;

  constructor(private db: AngularFirestore) {
    //Inicializa el objeto booksCollection
    this.booksCollection = this.db.collection<libro>(this.COLLECT_BOOKS);
  }

  //Metodo para obtener todos los libros
  get() {
    this.booksCollection = this.db.collection<libro>(this.COLLECT_BOOKS);
    //Retorna el resultado
    return this.booksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  //Metodo para añadir un libro en la BD
  post(libro: libro, idd: string) {
    const id = idd || this.db.createId();
    const data = { id, ...libro };
    return this.booksCollection.doc(id).set(data);
  }

  // Eliminar el libro de la BD
  eliminarr(item: libro) {
    this.booksCollection.doc(item.id).delete();
  }
}
