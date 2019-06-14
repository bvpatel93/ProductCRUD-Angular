import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { first, isEmpty } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,private toastr: ToastrService) {
       if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
  }
 }

  ngOnInit() {
 
    //  this.authenticationService.logout();
      this.loginForm = this.formBuilder.group({
      username: ['dev@clarion.com', Validators.required],
      password: ['Clarion123', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        let user= this.authenticationService.login(this.f.username.value, this.f.password.value);       
         if(user.firstName)
        // if(user)
         {
          this.router.navigate([this.returnUrl]);
         }
         else
         {
          this.toastr.error('Please verify your credentials','Error');
         }
        
        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             //this.alertService.error(error);
        //             alert(error)
        //             this.loading = false;
        //         });
    }

}
