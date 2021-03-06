import { ConfigService } from './../../shared/config.service';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/base.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User, UserManager, UserManagerSettings } from 'oidc-client';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager = new UserManager(getClientSettings())
  private user: User | null;

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();

    this.manager.getUser().then(user => {
      this.user = user;
      this._authNavStatusSource.next(this.isAuthenticated());
    })
  }

  login() {
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
    this.user = await this.manager.signinRedirectCallback();
    this._authNavStatusSource.next(this.isAuthenticated())
  }

  register(userRegistration: any) {
    return this.http.post(this.configService.authApiURI + '/account', userRegistration)
      .pipe(catchError(this.handleError));
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  get authorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  signout(): void {
    this.manager.signoutRedirect();
  }
}


export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://localhost:5000',
    client_id: 'angular_spa',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'id_token token',
    scope: 'openid profile email api.read',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  };
}