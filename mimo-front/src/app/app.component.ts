import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AtividadeService } from './service/AtividadeService';
import { Atividade } from './model/Atividade';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private snackBar = inject(MatSnackBar);

  constructor(private atividadeService: AtividadeService, private renderer: Renderer2) { }
  form: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    titulo: new FormControl(''),
    descricao: new FormControl(''),
  })

  atividades: Atividade[] = [];

  get f() { return this.form.controls; }

  ngOnInit() {
    this.loadAtividades();
  }

  loadAtividades() {
    this.atividadeService.getAtividades().subscribe(atividade => {
      atividade.forEach(atividade => {
        this.atividades.push(Atividade.fromJson(atividade));
      })
    });

    this.atividades.sort((a, b) => a.id - b.id);
  }

  newAtividade() {
    this.atividadeService.getLastId().subscribe(id => {
      this.form.setValue({
        id: id.id + 1,
        titulo: '',
        descricao: ''
      });
    })

    this.renderer.selectRootElement("#titulo").focus();
  }

  saveAtividade() {
    var atividade = {
      id: this.form.value.id,
      titulo: this.form.value.titulo,
      descricao: this.form.value.descricao}

    this.atividadeService.getLastId().subscribe(id => {
      atividade.id = id.id + 1;
    })

    this.atividadeService.saveAtividade(atividade).subscribe((message) => {
      this.snackBar.open(message.message, 'Fechar', { duration: 2000 });
    });

    this.atividades.push(atividade);
    this.form.reset();
  }

  updateAtividade(id: number) {
    var atividade = new Atividade(
      this.form.value.id,
      this.form.value.titulo,
      this.form.value.descricao)

    this.atividadeService.updateAtividade(atividade, id).subscribe((message) => {
      this.snackBar.open(message.message, 'Fechar', { duration: 2000 });
    });

    this.atividades.forEach(atividade => {
      if (atividade.id == id) {
        atividade.titulo = this.form.value.titulo;
        atividade.descricao = this.form.value.descricao;
      }
    })
  }

  deleteAtividade(id: number) {
    this.atividadeService.deleteAtividade(id).subscribe((message) => {
      this.snackBar.open(message.message, 'Fechar', { duration: 2000 });
    });

    this.atividades = this.atividades.filter(atividade => atividade.id != id);
    this.form.reset();
  }

  editAtividade(id: number) {
    this.atividades.forEach(atividade => {
      if (atividade.id == id) {
        this.form.setValue({
          id: atividade.id,
          titulo: atividade.titulo,
          descricao: atividade.descricao
        });
      }
    })

    this.renderer.selectRootElement("#titulo").focus();
  }

}
