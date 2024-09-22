import { selectUserName } from './../../store/selectors/user.selectors';
import { CommonModule, NgClass, NgIf} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ,RouterOutlet, RouterLink, NgClass, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [CookieService]
})
export class HomeComponent implements OnInit{
  active: string = 'landing';
  isLogin: boolean = false;
  UserName: string = '';
  postSelected: boolean = false;
  private cookieService = inject(CookieService);

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLogin = !!this.cookieService.get('auth_token');
    this.UserName = this.cookieService.get('name');
  }

  onUpdateRoute(route: string) {
    this.active = route;
    localStorage.setItem('activeRoute', route);
  }

  onLogout() {
    this.cookieService.delete('auth_token');
    this.cookieService.delete('user_id');
    this.cookieService.delete('name');
    this.isLogin = false;
    this.router.navigate(['/login']);
    // window.location.reload();
  }

  

}
