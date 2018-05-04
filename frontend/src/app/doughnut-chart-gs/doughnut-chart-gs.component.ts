import { Component } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart-gs',
  templateUrl: './doughnut-chart-gs.component.html',
  styleUrls: ['./doughnut-chart-gs.component.css']
})
export class DoughnutChartGSComponent  {

  public doughnutChartLabels:string[] = ['BvD', 'Kyc', 'Zefix'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartColors: any[] = [{ backgroundColor: ["#86BC25", "#2C5234", "#62B5E5"] }]

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}

