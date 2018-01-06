import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmployeeRaw} from '../data/employeeRaw';

import {EmployeeService} from '../data/employee.service';
import {Position} from '../data/position';
import { PositionService } from '../data/position.service';

import {LogService } from '../data/log.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  private paramSubScription: any;
  private employeeSubscription: any;
  private getPositionsSub: any;
  private saveEmployeeSubscription: any;
  
  private employee: EmployeeRaw;
  private positions: Position[];

  private successMessage =  false;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService,  private positionService: PositionService, private logService: LogService) {}

  ngOnInit() {

    this.paramSubScription = this.route.params.subscribe((params) => {
        this.employeeSubscription = this.employeeService.getEmployee(params['_id']).subscribe((emp) => {
          this.employee = emp[0];

          this.getPositionsSub = this.positionService.getPositions().subscribe( data => {
            this.positions = data;
          });
        });
   });
  }

  onSubmit(){
    this.saveEmployeeSubscription = this.employeeService.saveEmployee(this.employee).subscribe(()=>{
      this.successMessage = true;
      this.logService.writeLog("updated employee: " + this.employee.FirstName + " " + this.employee.LastName);
      setTimeout(()=>{
        this.successMessage = false;
      },2500)
    });
  }

  ngOnDestroy(){
    if(this.paramSubScription){this.paramSubScription.unsubscribe();}
    if(this.employeeSubscription){this.employeeSubscription.unsubscribe();}
    if(this.getPositionsSub){this.getPositionsSub.unsubscribe();}
    if(this.saveEmployeeSubscription){this.saveEmployeeSubscription.unsubscribe();}
  }
}

