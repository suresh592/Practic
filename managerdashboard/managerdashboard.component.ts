import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HotelMangementServicesService } from '../services/hotel-mangement-services.service';

@Component({
  selector: 'app-managerdashboard',
  templateUrl: './managerdashboard.component.html',
  styleUrls: ['./managerdashboard.component.css']
})
export class ManagerdashboardComponent implements OnInit {
  userId:any;
  name: any;
  mobileNumber: any;
  email: any;
  gender: any;
  salary: any;
  nic: any;
  address: any;
  password: any;
  role: any;
  routeParameter: any;
  addManagerSubscription: Subscription = new Subscription;
  updateManagerSubscription: Subscription = new Subscription;
  manageUser: any;

  constructor(public manageManager:HotelMangementServicesService,  private activeRoute:ActivatedRoute,public router:Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.routeParameter = routeParams['id'];
    });
    if(this.routeParameter == 'updateUser') {
      const userData: any = localStorage.getItem('ToUpdateUserData');
      const user = JSON.parse(userData);
      this.userId = user.userId;
      this.name = user.name;
      this.mobileNumber = user.mobileNumber;
      this.email = user.email;
      this.gender = user.gender;
      this.salary = user.salary;
      this.nic = user.nic;
      this.address = user.address;
      this.password = user.password;
      this.role = user.role;
    }
  }
  
  onManagerFormSubmit(ManagerDetails: any) {
    console.log("details", ManagerDetails.value);
    if(this.routeParameter == 'addUser') {
      this.addManagerSubscription = this.manageUser.AddUser(ManagerDetails.value).subscribe((data: any) => {
        console.log("response", data);
        this.router.navigate(['/Dashboard/manager']);
      });
    }else{
      this.updateManagerSubscription = this.manageUser.updateUser(this.userId,ManagerDetails.value).subscribe((data: any) => {
        console.log("response", data);
        this.router.navigate(['/Dashboard/manager']);
      });
    }

  }
}
