import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Familia, Persona } from '../../services/familia';
import { finalize, retry, timeout } from 'rxjs';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  constructor(
    private FamiliaService: Familia,
    private cdr: ChangeDetectorRef
  ) {}

  public francisco?: Persona;
  public error = '';
  public cargando = true;

  ngOnInit() {
    this.cargando = true;
    this.error = '';

    this.FamiliaService.obtenerPersonaPorId('6').pipe(
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
      next: (persona) => {
        this.francisco = persona;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar la informacion.';
        this.cdr.detectChanges();
      }
    });
  }

}
