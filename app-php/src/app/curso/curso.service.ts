import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './curso';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //url
  url = "http://localhost:8080/api/php/";

  //vetor
  vetor: Curso[] = [];

  //construtor
  constructor(private http: HttpClient) { }

  //Obter todos os cursos
  obterCursos(): Observable<Curso[]> {
    return this.http.get(this.url + "listar").pipe(
      map((res: any) => {
        this.vetor = res['cursos'] as Curso[];
        return this.vetor;
      })
    )
  }

  //Cadastrar curso
  cadastrarCurso(c: Curso): Observable<Curso[]> {
    return this.http.post(this.url + 'cadastrar', { cursos: c })
      .pipe(map((res: any) => {
        this.vetor.push(res['cursos']);
        return this.vetor;
      }))
  }

 removerCurso(c: Curso): Observable<Curso[]> {
  if (!c.idCurso) {
    return throwError('Curso object does not have an "idCurso" property.');
  }

  const params = new HttpParams().set('idCurso', c.idCurso.toString());

  return this.http.delete(this.url + 'excluir', { params })
  .pipe(map((res: any) => {
      console.log('Before filter:', this.vetor.map(curso => curso.idCurso)); // Log IDs before filtering
      const filtro = this.vetor.filter((curso) =>{ 
        return +curso['idCurso'] !== +c.idCurso; 
     
    });
    console.log('After filter:', filtro.map(curso => curso.idCurso)); // Log IDs after filtering
    return this.vetor = filtro;
  }))
}
  
  atualizarCurso(c:Curso): Observable<Curso[]>{
    //Executa a alteração via URL
    return this.http.put(this.url+'alterar', {cursos: c})

    //Percorrer o vetor para saber qual é o id do curso alterado
    .pipe(map((res) => {
      const cursoAlterado = this.vetor.find((item) => {
        return item['idCurso'] === +['idCurso'];
      });

      //Altera o curso
      if (cursoAlterado) {
        cursoAlterado['nomeCurso'] = c['nomeCurso'];
        cursoAlterado['valorCurso'] = c['valorCurso'];
      }
      return this.vetor;
    }))
  }
  
}

