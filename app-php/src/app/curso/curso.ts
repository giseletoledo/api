//Classe
export class Curso {

    //Atributos
    nomeCurso: string | null = null;
    valorCurso: number | null = null;
    idCurso: number =0;

    //Método para limpar atributos
    limpar(){
        this.nomeCurso = null;
        this.valorCurso = null;
    }
    
}