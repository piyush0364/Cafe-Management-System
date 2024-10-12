import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { UserStoreService } from '../../Service/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private auth:AuthService, private userStore: UserStoreService){

  }

  toggle = false;
  toggleSidebar() {
    this.toggle = !this.toggle;
  }

  logout()
  {
    this.auth.signOut();
  }
}
