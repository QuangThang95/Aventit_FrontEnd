import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Injector, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '@shared/components/base.component';
import { AuthSandbox } from '../auth.sandbox';
import { HttpResponseHandler } from '@shared/asyncServices/http/httpResponseHandler.service';
import { isNullOrUndefined, isArray } from 'util';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilService } from '@shared/utilites';
import { Cookie } from 'ng2-cookies/ng2-cookies';



@Component({
  selector: 'kiss-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  submitted = false;
  userName: AbstractControl;
  password: AbstractControl;
  loginForm: FormGroup;
  copyRightName: number;
  messageLoginFail: string;
  titleLoginFail: string;
  popupVisible: boolean = false;
  listUserPrimaryKey: any;
  displayExpr: string;
  logonName: string;
  userNameValue: string;

  private subscriptions: Subscription[] = [];
  private subLoadXUser: Subscription;

  constructor(
    private router: Router,
    private utilService: UtilService,
    injector: Injector,
    private fb: FormBuilder,
    public authSandbox: AuthSandbox, public httpResponseHandler: HttpResponseHandler) {
    super(injector);
    this.initLoginForm();

  }
  ngOnInit() {
    let userNameCookie = Cookie.get('userNameCookie');
    if (userNameCookie) {
      this.userNameValue = userNameCookie;
      localStorage.setItem('user:userLogonCookie', userNameCookie);
    }
    this.subscriptions.push(
      this.authSandbox.loggedUser$.subscribe(user => {

        if (user.isLoggedIn) {
          this.authSandbox.LoadXUser(this.loginForm.get('username').value);
          this.authSandbox.LoadVesion();
          this.authSandbox.LoadLinkIban();
          this.authSandbox.LoadXUser$.subscribe((xUser: any) => {
            sessionStorage.setItem('user:Xuser', JSON.stringify(xUser));
            localStorage.setItem('user:Xuser', JSON.stringify(xUser));
            if (xUser && xUser[0] && xUser[0].userID) {
              localStorage.setItem('user:firstName', xUser[0].firstName);
              localStorage.setItem('user:lastName', xUser[0].lastName);
              this.authSandbox.LoadMultipleXUsers(xUser[0].userID, xUser[0].primaryUserID ? xUser[0].primaryUserID : '');
              this.authSandbox.LoadMultipleXUsers$.subscribe(dataXUser => {
                if (dataXUser !== undefined && dataXUser !== null && isArray(dataXUser) && dataXUser.length) {
                  if (dataXUser.length > 1) {
                    this.listUserPrimaryKey = dataXUser;
                    if (this.listUserPrimaryKey.length) {
                      document.getElementById('H001_show-the-popup').click();
                    }
                  }
                  else {
                    this.authSandbox.LoadUserRight(xUser[0].userID);
                    this.authSandbox.LoadUserRight$.subscribe(userRight => {
                      sessionStorage.setItem('user:right', JSON.stringify(userRight));
                      localStorage.setItem('user:right', JSON.stringify(userRight));
                    });
                    if (this.router.url === this.utilService.getConfig('page').login) {
                      return this.router.navigate([this.utilService.getConfig('page').fallnavigator]);
                    }
                  }
                }
              });
            }
          });
        }
      })
    )
    this.setTitle('Login');
    this.copyRightName = new Date().getFullYear();
    this.authSandbox.registerAuthEvents();
  }

  ngOnDestroy() {
    // this.authSandbox.unregisterEvents();
    this.subscriptions.forEach(i => i.unsubscribe());
  }

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules
   */
  public initLoginForm(): void {
    let userNameCookie = Cookie.get('userNameCookie');
    this.loginForm = this.fb.group({
      username: [localStorage.getItem('user:userLogon') ? localStorage.getItem('user:userLogon') : (userNameCookie ? userNameCookie : ''), Validators.required],
      password: ['', Validators.required]
    });
    this.userName = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }
  /**
   * Handles form 'submit' event. Calls sandbox login function if form is valid.
   *
   * @param event
   * @param form
   */
  public onSubmit(event: Event, form: any): void {
    event.stopPropagation();
    this.submitted = true;
    const tokens = this.authSandbox.getConfigsToken();
    form.client_id = tokens.client_id;
    form.client_secret = tokens.client_secret;
    form.grant_type = tokens.grant_type;
    form.scope = tokens.scope;
    Cookie.set('userNameCookie', this.loginForm.get('username').value);
    if (form.username == "") {
      this.messageLoginFail = "Fehler bei der Anmeldung.";
      this.titleLoginFail = "";
      this.httpResponseHandler.showNotificationError(this.titleLoginFail, this.messageLoginFail);
      setTimeout(() => window.location.reload(), 3000);
    }
    else {
      this.authSandbox.login(form);
    }
  }

  // Hidden popup
  onHiding() {
    if (this.router.url === this.utilService.getConfig('page').login) {
      return this.router.navigate([this.utilService.getConfig('page').fallnavigator]);
    }
  }

  clickOkBenutzer() {
    if (isNullOrUndefined(this.logonName)) {
      if (this.listUserPrimaryKey.length > 0) {
        this.logonName = this.listUserPrimaryKey[0].logonName
      }
    }
    this.authSandbox.LoadXUser(this.logonName);
    this.authSandbox.LoadXUser$.subscribe((xUser: any) => {
      if (xUser && xUser[0] && xUser[0].userID) {
        sessionStorage.setItem('user:Xuser', JSON.stringify(xUser))
        this.authSandbox.LoadUserRight(xUser[0].userID);
        this.authSandbox.LoadUserRight$.subscribe(userRight => {
          sessionStorage.setItem('user:right', JSON.stringify(userRight));
          localStorage.setItem('user', this.logonName);
        });
        if (this.router.url === this.utilService.getConfig('page').login) {
          return this.router.navigate([this.utilService.getConfig('page').fallnavigator]);
        }
      }
    })
  }
  //Check click combobox event
  selectDropdownValue($event) {
    this.logonName = $event.itemData.logonName;
  }
}
