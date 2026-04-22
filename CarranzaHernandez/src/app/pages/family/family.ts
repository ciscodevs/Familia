import { ChangeDetectorRef, Component } from '@angular/core';
import { Familia, Persona } from '../../services/familia';
import { RouterLink } from "@angular/router";
import { finalize, retry, timeout } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-family',
  imports: [RouterLink, CommonModule],
  templateUrl: './family.html',
  styleUrl: './family.css',
})
export class Family {

  datosFamilia: Persona[] = [];
  cargando = true;
  error = '';

  constructor(
    private serviceFamilia: Familia,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.cargando = true;
    this.error = '';

    this.serviceFamilia.consultarFamilia().pipe(
      timeout(30000),
      retry({
        count: 2,
        delay: 1500
      }),
      finalize(() => {
        this.cargando = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (data) => {
        this.datosFamilia = data;
        console.log('Integrantes recibidos:', data.length);
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No fue posible cargar los integrantes desde la API.';
        this.cdr.detectChanges();
      }
    });
  }
 
  trackById(index: number, persona: Persona): number {
    return persona.idIntegrante;
  }

}
