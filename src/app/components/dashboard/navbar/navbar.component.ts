import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../shared/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
    shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  constructor( private authService: AuthorizationService) { }

  ngOnInit(): void {
  }

  salir() {
    this.authService.logout();
  }

}
