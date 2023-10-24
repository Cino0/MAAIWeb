import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Anni } from 'src/app/interface/anni';

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
  private anno=0;
  anni : Anni[] =[]

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


  setAnni(){
    let date = new Date();
    this.anno=(date.getFullYear()*2)+1;
    for(let i=this.anno-4;i<=this.anno; i++){
      let app = (i-1)/2;
      let  inizio :string = app.toString().substring(2,4);
      let fin = app+1;
      let fine : string = fin.toString().substring(2,4);
      let annoVis= inizio + "/"+ fine;
      let a :Anni = {value :i, viewValue:annoVis}
      this.anni.push(a)
      i++;
    }
  }

  cambioAnno(e: any) {
    this.anno=e;
    console.log(this.anno)
  }

  ngOnInit(): void {
    this.setAnni()
  }
}
