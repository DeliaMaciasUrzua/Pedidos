import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorizationService } from '../shared/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  loading = false;

  // horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( private FormBuilder: FormBuilder,
                private _snackBar: MatSnackBar,
                private router: Router,
                private authService: AuthorizationService) {
    this.form = this.FormBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  ingresar() {
    console.log(this.form);
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    console.log(usuario);
    console.log(password);

    if(usuario == 'Delia' && password == 'admin123') {
      // Redireccionar
      var token = {
        value: 'Bearer ABCD123456789',
        expires: 14
      }
      this.authService.saveToken(token);


      this.fakeLoading();
    } else {
      // Mostrar un error
      this.error();
      this.form.reset();
    }
  }


  error() {

    this._snackBar.open('Usuario o Contraseña ingresado son inválidos', 'Cerrar', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {

      // Redireccionar al DashBoard

      // this.loading = false;
      this.router.navigate(['/dashboard']);
    }, 1500)
  }

}
