import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';
import { PlotgraphProvider } from '../../providers/plotgraph/plotgraph'
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('lineCanvas') lineCanvas;

  rawData: any;
  lineChart: any;
  filtered: any;

  public event = {
    month: '2016-02-19',
    timeEnds: '2018-02-20'
  }

  constructor(
    public navCtrl: NavController,
    public plotgraph : PlotgraphProvider
  ) {
    this.getData()
  }

  getData() {
    this.plotgraph.load()
    .then((res)=> {
      this.rawData = res
      this.plotG1()
    })
  }


  changeStartDate(){
    this.plotG1()
  }

  changeEndDate(){
    this.plotG1()
  }

plotG1() {

//  let date = [];
//  let sale = [];

// this.rawData.forEach(element => {
//  console.log(element)
// date.push(element._id)
// sale.push(element.totalPrice)

// });


this.filtered = this.rawData.filter((element)=>
{ 
  console.log(element)
  let start = moment(this.event.month,'YYYY-MM-DD').format('YYYYMMDD')
  let end = moment(this.event.timeEnds,'YYYY-MM-DD').format('YYYYMMDD')
  let aArr =  moment(element._id,'MM/DD/YY').format('YYYYMMDD')

  return (aArr >= start && aArr <= end)
});



this.filtered = this.filtered.map((element) => {
  return { 
          _id :moment(element._id,'MM/DD/YYYY').format('DD/MM/YYYY'),
          totalPrice :element.totalPrice
        }
})



this.filtered.sort(function(a, b) {

    let aArr =  a._id.split('/');
    let bArr =  b._id.split('/');

  return new Date(aArr[2], Number(aArr[1])-1, aArr[0]).getTime() - new Date(bArr[2], Number(bArr[1])-1, bArr[0]).getTime()
});

let total = []
let date = []
this.filtered.forEach(element => {
  console.log(element)
    total.push(element.totalPrice)
    date.push(element._id)
})

console.log(total)

  this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {    
          labels: date,
          datasets: [
              {
                  label: "Daily Sales",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: total,
                  spanGaps: false,
              }
          ]
      }

  });
}

   


     
  



  
  


}
