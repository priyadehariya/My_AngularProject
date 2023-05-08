import { DatePipe } from '@angular/common';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartComponentLike, ChartData, ChartDataset } from 'chart.js';
import { ChartType, ChartOptions } from 'chart.js';
import { ThisReceiver } from '@angular/compiler';
import ChartDataLabels from 'chartjs-plugin-datalabels'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public pieChartData: any = [];
  public clockDateValues :any = [];
  public workingHoursValues : any = [];
  barChartData:  any = [];
  salaryBarChartData : any =[];
  SalaryClockDateValues : any = [];
  SalaryDataValues: any = [];
  constructor(public dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.pieChart();
    this.barChart();
    this.salaryBarchart();
  }

  pieChart() {
    var barColors = [
     "#fada5e" ,
      "#b91d47",
    ];
    console.log("PieChart");
    this.dashboardService.GetActiveAndResignedEmployeeCount().subscribe((data) => {
      this.pieChartData = data;
      new Chart('myChart', {
        plugins: [ChartDataLabels],
        type: 'pie',
        data: {
          labels: [ 'Resigned_Employee', 'Active_Employee'],
          datasets: [
            {
              backgroundColor: barColors,
              data: this.pieChartData,

            },
          ],
        },
      });
    });
  }

  barChart(){
    var barColors1 = ["blue","orange","brown","red", "green"];
    var datePipe = new DatePipe('en-US');
    this.dashboardService.GetEmployeeWorkingHours().subscribe((data)=>{
      this.barChartData=data;
      this.barChartData.forEach((e: { clockDate: any; workingHours: any; }) => {
        this.clockDateValues.push(datePipe.transform(e.clockDate,'dd-MMM-yyyy'));
        this.workingHoursValues.push(e.workingHours);
      });
      new Chart("barChart", {
        plugins: [ChartDataLabels],
        type: "bar",
        data: {
          labels: this.clockDateValues,
          datasets: [{
            backgroundColor: barColors1,
            data: this.workingHoursValues,
            label:'WorkingHours',
          }]
        },
      });
    })
  }



  salaryBarchart(){
    var barColors = ["blue","red", "green","orange","brown"];
    var datePipe = new DatePipe('en-US');
    this.dashboardService.GetEmployeeSalary().subscribe(data =>{
    this.salaryBarChartData = data
    console.log("Salary Bar Chart",this.salaryBarChartData);
    this.salaryBarChartData.forEach((e: { clockDate: any; salary: any; }) => {
      this.SalaryClockDateValues.push(datePipe.transform(e.clockDate,'dd-MMM-yyyy'));
      this.SalaryDataValues.push(e.salary);
    });
    new Chart("barChart2", {
      plugins: [ChartDataLabels],
      type: "bar",
      data: {
        labels: this.SalaryClockDateValues,
        datasets: [{
          backgroundColor: barColors,
          data: this.SalaryDataValues,
          label:'Salary',
        }]
      },
    });
    })
  }

}
