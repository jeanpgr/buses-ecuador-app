import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-destinos-user',
  templateUrl: './destinos-user.page.html',
  styleUrls: ['./destinos-user.page.scss'],
})
export class DestinosUserPage implements OnInit {

  num_bus!: string;
  nom_coop!: string;
  placa_bus!: string;
  destino_final!: string;
  tipo_viaje!: string;
  paradas!: string;
  hora!: string;

  options!: any[];
  selectedOption: any;
  private listObjIdFrec: any = []

  itemsRoutesFilterAux: any[] = [];
  itemsRoutesFilter: any[] = [];
  private responseRoutes: any[] = [];

  selectedItems: any[] = [];
  showBackdrop: boolean = false;

  constructor(private http: HttpClient) {
    this.recoverCitiesOrigin();

  }

  ngOnInit() {
  }

  clearSelection() {
    this.selectedOption = null;
    this.itemsRoutesFilter = [];
  }

  recoverCitiesOrigin() {
    const urlRutas = 'http://localhost:8080/rutas/obtener-rutas';
    this.http.get<any[]>(urlRutas).subscribe(
      (response) => {
        if (response !== null) {
          this.options = this.cleanOptionsCities(response);
        }
      },
      (error) => {
        console.error('Error al recuperar ciudades:', error);
      }
    );
  }

  cleanOptionsCities(response: any): any[] {
    const propertyName = 'ciudadIniRuta';
    const listCities: any[] = [];
    const seenProperties: Set<any> = new Set();
    for (const json of response) {
      this.getDetalleRuta(json['idRuta']);
      const property = json[propertyName];
      if (!seenProperties.has(property)) {
        seenProperties.add(property);
        listCities.push(property);
      }
    }
    return listCities;
  }

  getDetalleRuta(idRoute: any) {

    const url = 'http://localhost:8080/rutas/obtener-detalle-de-ruta-completo-por-id/' + idRoute;
    this.http.get<any[]>(url).subscribe(
      (response) => {
        if (response !== null) {
          this.responseRoutes.push(response);
        }
      },
      (error) => {
        console.error('Error al recuperar detalle de rutas', error);
      }
    );
  }

  getIdFrecOrigin() {
    this.listObjIdFrec = [];
    const seenProperties: Set<any> = new Set();
    for (let object of this.responseRoutes) {
      if (object.ciudadIniRuta === this.selectedOption && !seenProperties.has(object.idFrecRuta)) {
        this.listObjIdFrec.push(object);
        seenProperties.add(object.idFrecRuta);
      }
    }
    console.log(this.listObjIdFrec);
  }

  filterRoutesToOrigin() {
    this.itemsRoutesFilterAux = [];
    this.getIdFrecOrigin();
    for (let object of this.responseRoutes) {
      for (let objidFrec of this.listObjIdFrec) {
        if (object.idFrecRuta === objidFrec.idFrecRuta) {
          this.itemsRoutesFilterAux.push(object);
          this.excludelowestid(objidFrec.idRuta);
        }
      }

    }
  }

  excludelowestid (idRuta: any) {
    this.itemsRoutesFilter = [];
    for (let obj of this.itemsRoutesFilterAux) {
      if (obj.idRuta >= idRuta) {
        this.itemsRoutesFilter.push(obj);
      }
    }
  }

}
