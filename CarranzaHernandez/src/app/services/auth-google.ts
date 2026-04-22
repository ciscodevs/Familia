import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PerfilGoogle {
  email?: string;
  name?: string;
  picture?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGoogle {
  private readonly perfilSubject = new BehaviorSubject<PerfilGoogle | null>(null);
  private readonly listoSubject = new BehaviorSubject<boolean>(false);
  perfil$ = this.perfilSubject.asObservable();
  listo$ = this.listoSubject.asObservable();

  constructor(private oAuthServ: OAuthService, private router: Router) {
    this.inicializarLoginGmail();
    this.suscribirEventosAuth();
  }

  private inicializarLoginGmail() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '867022391712-fq6055tutr9qovu6fcuonphqt6jhk6go.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/login',
      responseType: 'id_token token',
      scope: 'openid profile email'
    };

    this.oAuthServ.configure(config);
    this.oAuthServ.setupAutomaticSilentRefresh();

    this.oAuthServ.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        this.actualizarPerfil();
        this.redireccionPostLogin();
      })
      .finally(() => {
        this.listoSubject.next(true);
      });
  }

  login(redirectTo = '/family') {
    sessionStorage.setItem('post_login_redirect', redirectTo);
    this.oAuthServ.initImplicitFlow();
  }

  logout() {
    this.oAuthServ.logOut();
    this.perfilSubject.next(null);
    this.router.navigateByUrl('/home');
  }

  estaAutenticado(): boolean {
    return this.oAuthServ.hasValidAccessToken() || this.oAuthServ.hasValidIdToken();
  }

  getPerfilActual(): PerfilGoogle | null {
    return this.perfilSubject.value;
  }

  private actualizarPerfil() {
    const claims = this.oAuthServ.getIdentityClaims() as PerfilGoogle | null;
    if (claims?.picture || claims?.name || claims?.email) {
      this.perfilSubject.next(claims);
      return;
    }

    if (!this.estaAutenticado()) {
      this.perfilSubject.next(null);
      return;
    }

    this.oAuthServ.loadUserProfile().then((profile: any) => {
      const info = profile?.info ?? {};
      this.perfilSubject.next({
        email: info.email,
        name: info.name,
        picture: info.picture
      });
    }).catch(() => {
      this.perfilSubject.next(claims ?? null);
    });
  }

  private redireccionPostLogin() {
    if (!this.estaAutenticado()) {
      return;
    }

    const saved = sessionStorage.getItem('post_login_redirect');
    if (saved) {
      sessionStorage.removeItem('post_login_redirect');
      this.router.navigateByUrl(saved);
      return;
    }

    if (this.router.url === '/login') {
      this.router.navigateByUrl('/family');
    }
  }

  private suscribirEventosAuth() {
    this.oAuthServ.events.pipe(
      filter((e) =>
        e.type === 'token_received' ||
        e.type === 'user_profile_loaded' ||
        e.type === 'session_terminated' ||
        e.type === 'session_error'
      )
    ).subscribe(() => {
      this.actualizarPerfil();
    });
  }
}
