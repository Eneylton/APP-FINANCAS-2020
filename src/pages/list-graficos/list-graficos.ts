import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import chartJs from 'chart.js';


@IonicPage({})
@Component({
  selector: 'page-list-graficos',
  templateUrl: 'list-graficos.html',
})
export class ListGraficosPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;
  barChart: any;
  tipo:any;
  total:any;

  estatisticas:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public serve: ServiceProvider) {
  }

  ngAfterViewInit() {

    setTimeout(() => {
    
      this.barChart = this.getBarChart();
      this.doughnutChart = this.getDoughnutChart();

    }, 150);
  
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }


  getBarChart() {

    let body = {
      crud: 'est_categoria'
    }
    
    this.serve.postData(body, 'Graficos.php').subscribe(data =>{

      for (let i = 0; i < data.result.length; i++){

        var labels = data.result.map(function(e) {
        return e.descricao;
        });
  
         var data2 =data.result.map(function(e) {
        return e.total;
        });
  
        console.log(labels);
  
      }
  
        const resultados = {
          
       
          labels:labels,
          datasets: [{
            label: 'Estatística',
            data: data2,
            backgroundColor: [
              '#1761b78c',
              '#0ddc6a99',
              '#fbff0099',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              '#0ddc6a99',
              '#1761b78c',
              '#fbff0099',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        };
        const options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        };
    
        return this.getChart(this.barCanvas.nativeElement, 'bar', resultados, options);

      
    })


    }

    getDoughnutChart() {

      let body = {
        crud: 'est_pagamento'
      }
      
      this.serve.postData(body, 'Graficos.php').subscribe(data =>{
  
        for (let i = 0; i < data.result.length; i++){
  
          var labels = data.result.map(function(e) {
          return e.descricao;
          });
    
           var data2 =data.result.map(function(e) {
          return e.total;
          });
    
        }
    
      const Resultados = {
        labels: labels,
        datasets: [{
          label: 'Categorias',
          data: data2,
          backgroundColor: [
            '#9c27b0',
            '#ffc107',
            '#0594b6',
            '#3b005d',
            '#ff4127',
            '#f8e004'
          ],
          hoverBackgroundColor: ['#9c27b0', '#ffc107', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56']
        }]
      };
  
      return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', Resultados);
    })
  }
    

    }

