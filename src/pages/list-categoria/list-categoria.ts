import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-list-categoria',
  templateUrl: 'list-categoria.html',
})
export class ListCategoriaPage {
  
  data: string = new Date().toISOString();

  limit: number = 10;
  start: number = 0;
  categorias:any = [];
  todos: Array<{ id: any, descricao: string }>;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, public server: ServiceProvider, public alertCtrl: AlertController) {
  
    this.categorias = [];

  }

  ionViewDidLoad() {
  
    this.listCategorias();
    this.start = 0;
  
  }

  doRefresh(event) {

    setTimeout(() => {
      this.loadData(event);
      event.complete();
  
    }, 1000);
  }

  loadData(event: any) {
    this.start += this.limit;
  
    setTimeout(() => {
      this.listCategorias().then(() => {
        event.complete();
      })
    }, 1000);
  }


  listCategorias() {

    return new Promise(resolve => {

    let body = {

      limit: this.limit,
      start: this.start,
      crud:'listar_cat'

    }

    this.server.postData(body,'Financeiro.php').subscribe(data =>{

      for(let item of data.result)
      this.categorias.push({
            
        id: item.id,
        descricao:item.descricao


      })
    })

     resolve(true);
  
     this.todos = this.categorias;

  })

  }

  getCategorias(ev: any) {

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.categorias = this.todos.filter((item) => {
          return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1)
        })
    } else {
      this.categorias = this.todos;
    }
  }

  openCadastro(){

    this.navCtrl.push('CadCategoriaPage');  
  }

  openEdit(id, descricao){

    this.navCtrl.push('EditCategoriaPage',{
      id:id,
      descricao: descricao
    })
  }

  openDelete(id){

    let body = {
      id:id,
      crud:'deletar'
    }

    this.server.postData(body,'Financeiro.php').subscribe(data => {

      this.showInsertOk();

    })

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Registro Deletado ...',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.navCtrl.setRoot('ListCategoriaPage')
          }
        }
      ]
    });
    alert.present();
  }


}
