import { Component, VERSION } from '@angular/core';
import { FireService } from './fireservice';
import { libro } from './libros';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /******
   * ATRIBUTOS
   *****/
  public libros: libro[];
  public nuevo_libro: string;
  public n_price: string;
  public n_type: string;
  public libro: libro = null;
  public name: string;
  public id: string;
  public price: string;
  public type: string;

  constructor(private fireService: FireService) {
    this.libros = [];
    this.nuevo_libro = '';
    this.getLibros();
    this.name = '';
    this.id = '';
    this.n_type = '';
    this.n_price = '';
    this.price = '';
    this.type = '';
  }

  //Método para obtener todos los libros
  getLibros() {
    this.fireService.get().subscribe(
      (respLibro: libro[]) => {
        //Obtiene el resultado de la consulta
        this.libros = respLibro;
      },
      error => {
        //Aquí imprime el error en caso de no comunicarse con firebase o un error de BD
        console.error(error);
      }
    );
  }

  crearLibro() {
    let libro: libro = {
      name: this.nuevo_libro,
      price: this.n_price,
      type: this.n_type
    };
    this.fireService.post(libro, libro.id).then(resp => {
      this.nuevo_libro = '';
      this.n_price = '';
      this.n_type = '';
    });
  }
  // Eliminar
  eliminarLibro(item: libro) {
    try {
      this.fireService.eliminarr(item);
      alert('¡Se ha eliminado el libro!');
    } catch (err) {
      console.log(err);
    }
  }
  //Consultar
  consultaLibro(item: libro) {
    this.name = item.name;
    this.id = item.id;
    this.type = item.type;
    this.price = item.price;
  }

  // Actualizar
  actualizarLibro() {
    let libro: libro = {
      id: this.id,
      name: this.name,
      type: this.type,
      price: this.price
    };
    this.fireService.post(libro, libro.id);
  }
}
