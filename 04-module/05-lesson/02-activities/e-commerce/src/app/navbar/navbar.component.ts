import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  environment = environment

  constructor(
    public adminService: AdminService
  ) { }

  toggleAuth() {
    this.adminService.authenticated = !this.adminService.authenticated;
  }

}
