import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Familia, Persona } from '../../services/familia';
import { finalize, timeout } from 'rxjs';

@Component({
  selector: 'app-integrant',
  imports: [RouterLink],
  templateUrl: './integrant.html',
  styleUrl: './integrant.css',
})
export class Integrant {

  public individuo?: Persona;
  public error = '';
  public cargando = true;

  constructor(
    private _route: ActivatedRoute,
    private _servicioFamilia: Familia,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    const idNumerico = Number(id);

    if (id && Number.isInteger(idNumerico) && idNumerico > 0) {
      this._servicioFamilia.obtenerPersonaPorId(id).pipe(
        timeout(10000),
        finalize(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        })
      ).subscribe({
        next: (persona) => {
          this.individuo = persona;
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'No se encontro informacion de este integrante.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.error = 'ID de integrante invalido.';
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

}
