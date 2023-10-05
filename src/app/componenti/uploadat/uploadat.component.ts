import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadat',
  templateUrl: './uploadat.component.html',
  styleUrls: ['./uploadat.component.css'],
})
export class UploadatComponent implements OnInit {
  visualizza: string = 'ATT';
  private nome: string = '';
  private data = new FormData();
  private dataIscr = new FormData();
  constructor(private http: HttpClient) {}

  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.data.append('file', file);
    }
  }
  onChangeFileIscr(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.dataIscr.append('file', file);
    }
  }
  onClickIscr() {
    this.http
      .post('http://localhost:8080/universitari/upload', this.dataIscr)
      .subscribe({
        next: (response) => console.log('ok', response),
        error: (error) => console.log(error),
      });
  }

  onClick() {
    this.http
      .post('http://localhost:8080/attivita/generi/' + this.nome, this.data)
      .subscribe({
        next: (response) => console.log('ok', response),
        error: (error) => console.log(error),
      });
  }

  cambio(event: any) {
    this.nome = event.target.value;
    console.log(this.nome);
  }

  cambioSel(e: any) {
    this.visualizza = e;
    console.log(this.visualizza);
  }

  ngOnInit(): void {}
}
