import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  titulo: string = "GreatSchool - Uma nova escola está nascendo!"; 

  constructor() { }

  ngOnInit(): void {
  }

}
