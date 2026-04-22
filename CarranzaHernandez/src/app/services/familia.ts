import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Persona {
  idIntegrante: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string | null;
  parentesco: string | null;
  telefono: string | null;
  sexo: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class Familia {
  private readonly apiUrl = 'http://localhost:8080/api/integrantes';

  constructor(private http: HttpClient) {}

  consultarFamilia(): Observable<Persona[]> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      map((response) => {
        if (!Array.isArray(response)) {
          return [];
        }

        return response.map((persona) => this.normalizarPersona(persona));
      })
    );
  }

  obtenerPersonaPorId(id: string): Observable<Persona> {
    return this.http.get<unknown>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return this.normalizarPersona(response[0]);
        }

        return this.normalizarPersona(response);
      })
    );
  }

  private normalizarPersona(data: unknown): Persona {
    const raw = (data ?? {}) as Record<string, unknown>;

    return {
      idIntegrante: Number(raw['idIntegrante'] ?? raw['id_integrante'] ?? raw['id'] ?? 0),
      nombre: this.toNullableString(raw['nombre']) ?? 'Sin nombre',
      apellido: this.toNullableString(raw['apellido']) ?? '',
      fechaNacimiento: this.toNullableString(raw['fechaNacimiento'] ?? raw['fecha_nacimiento']),
      parentesco: this.toNullableString(raw['parentesco']),
      telefono: this.toNullableString(raw['telefono']),
      sexo: this.toNullableString(raw['sexo']),
    };
  }

  private toNullableString(value: unknown): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const text = String(value).trim();
    return text.length > 0 ? text : null;
  }
}
