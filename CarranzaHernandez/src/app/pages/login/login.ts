import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthGoogle } from '../../services/auth-google';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private authGoogle: AuthGoogle,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.authGoogle.listo$.pipe(
      filter((listo) => listo),
      take(1)
    ).subscribe(() => {
      if (this.authGoogle.estaAutenticado()) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/family';
        this.router.navigateByUrl(returnUrl);
      }
    });
  }

  loginConGoogle() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/family';
    this.authGoogle.login(returnUrl);
  }
}
