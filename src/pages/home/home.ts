import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('pieCanvas') pieCanvas;

  tabBarElement: any;

  pieChart: any;

  total1:any;
  total2:any;
  total3:any;
  soma:any;
  

  fluxos:any = [];
  graficos:any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public server: ServiceProvider) {

      this.tabBarElement = document.querySelector('.tabbar');

      this.fluxos = [];
      this.soma = 0;
}

ionViewDidLoad() {
  this.tabBarElement.style.display = 'flex';
  this.ListarTotal();
  this.ListarFluxo();
}

ListarFluxo() {
    
  let body = {
    crud:'lista_fluxo'
  }

  this.server.postData(body,'Financeiro.php').subscribe(data =>{

    for(let i = 0; i < data.result.length; i++){

      this.fluxos.push({
        id: data.result[i]["id"],
        descricao:data.result[i]["descricao"],
        status:data.result[i]["status"],
        total:data.result[i]["total"]

      })

    }

  })

}

ListarTotal(){

  let body ={
    crud: 'lista_total'
  }

  this.server.postData(body, 'Graficos.php').subscribe(data =>{
    let total1 = 0;
    let total2 = 0
    for(let i =0; i < data.result.length; i++){

      if(data.result[i]["status"] == 1 ){

        total1 += parseFloat(data.result[i]["valor"]);

      }else if ( data.result[i]["status"] == 4) {
        
        total1 += parseFloat(data.result[i]["valor"]);
       
      }else if(data.result[i]["status"] == 3){

        total2 += parseFloat(data.result[i]["valor"]);

      }else if(data.result[i]["status"] == 5){

        total2 += parseFloat(data.result[i]["valor"]);

      }else{

        total2 += parseFloat(data.result[i]["valor"]);

      }

    }
    this.total1 = total1;
    this.total2 = total2;

    this.soma = (this.total1 - this.total2);
  
  })
   

}

getChart(context, chartType, data, options?) {
  return new chartJs(context, {
    data,
    options,
    type: chartType,
  });
}


ngAfterViewInit() {
  setTimeout(() => {

    this.pieChart = this.getPieChart();

  }, 350);
}

getPieChart() {
  let body = {

    crud: 'lista_Graficos'

  }

  this.server.postData(body, 'Graficos.php').subscribe(data => {

    for (let item of data.result) {

      this.graficos.push({

        descricao: item.descricao,
        total: item.total
      })

      var labels = this.graficos.map(function (e) {
        return e["descricao"];
      });

      var total = this.graficos.map(function (e) {
        return e["total"];
      });


    }

    const result = {
      labels: labels,
      datasets: [
        {
          data: total,
          backgroundColor: ['#8bc34a', '#00BCD4', '#ff00ff','#ff0000','#FFC107'],
          hoverBackgroundColor: ['#8bc34a', '#00BCD4', '#ff00ff','#ff0000 ','#FFC107']
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'pie', result);

  })
}

}



