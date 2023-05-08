 import { Component, OnInit } from '@angular/core';

@Component({
     selector: 'app-calculator',
   templateUrl: './calculator.component.html',
   styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

   constructor() { }

  ngOnInit(): void {
  }

  show = '0'

  currentvalue = ''

  fun(value : string){
    this.currentvalue = this.currentvalue + value
    this.show=this.currentvalue
  }

equal(){
  this.show = eval(this.currentvalue)
  this.currentvalue =this.show
}
 clear(){
  this.currentvalue = '';
  this.show = '';
 }

back(){
  this.currentvalue = this.currentvalue.slice(0,-1)
  this.show = this.currentvalue

}
}

//import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-calculator',
//   templateUrl: './calculator.component.html',
//   styleUrls: ['./calculator.component.css']
// })
// export class CalculatorComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }
//   show = '0'

//   currentvalue = ''

//   fun(value : string){
//     this.currentvalue = this.currentvalue + value
//     this.show=this.currentvalue
//   }

// equal(){
//   this.show = eval(this.currentvalue)
//   this.currentvalue =this.show
// }
//  clear(){
//   this.currentvalue = '';
//   this.show = '';
//  }



// }

