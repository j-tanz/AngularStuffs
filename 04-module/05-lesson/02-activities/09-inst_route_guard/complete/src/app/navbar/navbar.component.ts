import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit() {
  }

  toggleAuth() {
    this.adminService.authenticated = !this.adminService.authenticated;
  }

}
