import { Component } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent  {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['18/10/2017', '19/10/2017', '20/10/2017', '21/10/2017', '22/10/2017', '23/10/2017', '24/10/2017'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartColors: any[] = [
                                 { backgroundColor: ["#689F38", "#689F38", "#689F38", "#689F38", "#689F38", "#689F38", "#689F38"]}, 
                                 { backgroundColor: ["#37474f", "#37474f", "#37474f", "#37474f", "#37474f", "#37474f", "#37474f"]}, 
                                 { backgroundColor: ["#FF9800", "#FF9800", "#FF9800", "#FF9800", "#FF9800", "#FF9800", "#FF9800"]}, 
  								
  								 ]
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'BvD'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Kyc'},
    {data: [38, 18, 20, 49, 66, 17, 70], label: 'Zefix'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}