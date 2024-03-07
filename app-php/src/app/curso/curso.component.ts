import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent implements OnInit {

  //Objeto da classe Curso
  curso = new Curso();

  //Construtor
  constructor(private curso_servico: CursoService) { }

  //URL base
  url = "http://localhost:8080/api/php/";

  //Vetor de cursos
  vetor: Curso[] = [];

  ngOnInit(): void {
    //Ao iniciar, deverá listar os cursos
    this.selecao();
  }

  selecao() {
    this.curso_servico.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    )
  }
  cadastro(curso: Curso) {
    this.curso_servico.cadastrarCurso(curso).subscribe(
      (res: Curso[]) => {
        //Adicionando dados ao vetor
        this.vetor = res;

        //Limpar os atributos
        this.curso.limpar()

        //Atualizar a listagem
        this.selecao();
      }
    )
  }

  //Modificar 
  alterar(curso: Curso) {
    this.curso_servico.atualizarCurso(this.curso).subscribe(
      (res: Curso[]) => {

        //Atualizar o vetor
        this.vetor = res;

        //limpar os valores do objeto
        this.curso.limpar()

        //atualiza a listagem
        this.selecao();
      }
    )
  }

  //Remover
  remover(curso: Curso) {
    this.curso_servico.removerCurso(curso).subscribe(
      (res: Curso[]) => {

        //Atualizar o vetor
        this.vetor = res;

        //limpar os valores do objeto
        this.curso.limpar()
      }
    )
  }

  selecionarCurso(c: Curso) {
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }

}
