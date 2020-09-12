import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountServiceService } from '@services/account-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {


  public signupForm: FormGroup;
  public isSignupFormReady: boolean;
  public loginForm: FormGroup;
  public isLoginFormReady: boolean;
  private rootContainer;


  constructor(
    private fb: FormBuilder, private accountService: AccountServiceService, private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.createSignupForm();
    this.createLoginForm();
  }

  private createSignupForm() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.isSignupFormReady = true;
  }

  get signUpFormFName() {
    return this.signupForm.get('firstName');
  }

  get signUpFormLName() {
    return this.signupForm.get('lastName');
  }

  get signUpFormEmail() {
    return this.signupForm.get('email');
  }

  get signUpFormPassword() {
    return this.signupForm.get('password');
  }


  private createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.isLoginFormReady = true;
  }

  get loginFormEmail() {
    return this.loginForm.get('email');
  }

  get loginFormPassword() {
    return this.loginForm.get('password');
  }

  public activateSingupWindow() {
    document.getElementById('root-container').classList.add('right-panel-active');
    this.signupForm.reset();
  }

  public activateLoginWindow() {
    document.getElementById('root-container').classList.remove('right-panel-active');
    this.loginForm.reset();
  }

  loginManager() {
    const loginObj: LoginData = this.getLoginData();
    this.accountService.login(loginObj).subscribe((response: boolean) => {

      this.accountService.isLoggedIn = response;
      if (this.accountService.isLoggedIn) {
        this.messageService.add({
          severity: 'success', summary: 'Success', detail: 'Successfully Logged In', key: 'login-toast'
        });
        this.router.navigate(['/employee']);
      } else {
        this.messageService.add({
          severity: 'error', summary: 'Error', detail: 'Please check Email/Password', key: 'login-toast'
        });
      }

    })

  }

  addNewManager() {
    const newManager: Manager = this.getNewManagerObj();
    this.accountService.addNewManager(newManager).subscribe((response: boolean) => {
      console.log(response);
      this.accountService.isLoggedIn = response;
      this.messageService.add({
        severity: 'success', summary: 'Success', detail: 'Successfully Sign-ed In' , key: 'login-toast'
      });
      this.router.navigate(['/employee']);
    },
      (error) => {
        console.log('Error while creating new Manager');
        console.log(error);
        this.messageService.add({
          severity: 'error', summary: 'Error', detail: 'Email Already exist' , key: 'login-toast'
        });
      })
  }


  private getNewManagerObj(): Manager {
    const manager: Manager = {
      firstName: this.signUpFormFName.value,
      lastName: this.signUpFormLName.value,
      email: this.signUpFormEmail.value,
      password: this.signUpFormPassword.value
    };

    return manager;
  }

  getLoginData(): LoginData {
    const login: LoginData = {
      email: this.loginFormEmail.value,
      password: this.loginFormPassword.value
    }

    return login;
  }

}

export interface LoginData {
  email: string;
  password: string;
};

export interface Manager {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

