import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Atividade } from "../model/Atividade";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AtividadeService {
    constructor(private http: HttpClient) { 
    }  

    url = 'http://localhost:3000/atividade'

    httpOptions = {
        mode:'no-cors',
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
      }
    
    getAtividades() : Observable<Atividade[]> {
        return this.http.get<Atividade[]>(this.url + '/listar');
    }

    saveAtividade(atividade: any) : Observable<any>{
        return this.http.post<any>(this.url + '/nova', atividade, this.httpOptions);
    }

    updateAtividade(atividade: Atividade, id: number) : Observable<any>{
        return this.http.put<any>(this.url + '/editar/' + id, atividade, this.httpOptions);
    }

    deleteAtividade(id: number) : Observable<any>{
        return this.http.delete<any>(this.url + '/deletar/' + id);
    }

    getLastId() : Observable<any>{
        return this.http.get<any>(this.url + '/lastid');
    }
    
}