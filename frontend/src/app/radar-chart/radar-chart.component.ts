import { Component } from '@angular/core';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent  {

  // PolarArea
  public polarAreaChartLabels:string[] =  ['BvD', 'Kyc', 'Zefix'];
  public polarAreaChartData:number[] = [300, 500, 100];
  public polarAreaLegend:boolean = true;
  public polarAreaChartColors: any[] = [{ backgroundColor: ["#689F38", "#37474f", "#FF9800"] }]
 
  public polarAreaChartType:string = 'polarArea';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
