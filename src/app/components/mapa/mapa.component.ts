import { Component } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  marcadores: Marcador[] = [];

  lat = 40.41999808561473;
  lng = -3.6887454986572266;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
    // const nuevoMarcador = new Marcador(51.678418, 7.809007);

    // this.marcadores.push(nuevoMarcador);
  }

  agregarMarcador(event) {
    const coords: { lat: number; lng: number } = event.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);

    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar', {
      duration: 2000
    });
  }

  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar', {
      duration: 2000
    });
  }

  editarMarcador(marcador: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      marcador.titulo = result.titulo;
      marcador.desc = result.desc;

      this.guardarStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', {
        duration: 2000
      });
    });
  }

  private guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
}
