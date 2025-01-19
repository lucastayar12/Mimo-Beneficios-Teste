
export class Atividade {
    id: number;
    titulo: string;
    descricao: string;

    constructor(id: number, titulo: string, descricao: string) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
    }


    static fromJson(json: any) {
        return new Atividade(json.id, json.titulo, json.descricao);
    }
}