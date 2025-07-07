import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrAlertService } from '../../../../shared/services/toastr-alert/toastr-alert.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  private formBuilder  = inject(FormBuilder);
  private router       = inject(Router);
  private authService  = inject(AuthService);
  private toastr       = inject(ToastrAlertService);
  private spinner      = inject(NgxSpinnerService);

  @ViewChild('container')
  public container!: ElementRef;

  // faCoffee = faSackDollar;
  public isOpen = true;
  public rotationState = 'start';
  public animationFrame: any;
  public hide = true;

  public errorMessage = '';

  public flipped: boolean = false;
  public cordinations: any[] = [];

  // Variables de formulario
  public loginForm = this.formBuilder.group({
    user: ['fundetecadmin@gmail.com', [Validators.required]],
    password: ['fundeadm', [Validators.required, Validators.minLength(8)]],
  });

  public fullText = "REGISTRO Y CONTROL";
  public animatedText: string[] = [];

  constructor(){}

  ngOnInit(): void {
    // Divide el texto en un array de letras
    this.animatedText = this.fullText.split('');
  }

  // Validaciones personalizadas del formulario
  public updateErrorMessage(fieldName: string) {
    let control = this.loginForm.get(fieldName);

    if (!control){
      control = this.loginForm.get(fieldName);
    } 
    
    if(!control) return;

    // Obtener el valor del campo del formulario
    const fieldValue = control.value; 

    this.errorMessage = '';
    switch (fieldName){
      case 'password':  
        if (control.touched && fieldValue == '') {
          this.errorMessage = `Campo debe ser diligenciado`;
        } else if (control.touched  && fieldValue.length < 8) {
          this.errorMessage = 'Longitud de contraseña debe ser mayor a 8 caracteres';
          control.setErrors({ invalid: true }); // Marcar el campo como inválido
        } else {
          this.errorMessage = '';
        }
      break;
    }
  }

  get email() {
    return this.loginForm.get('user');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public submitForm(): void{
    const {user, password} = this.loginForm.value;

    if(user && password){
      this.spinner.show();
      setTimeout(() => { 
        this.authService.login(user, password).subscribe({
          // Redirecciona a el dashboard si la autenticación es valida
          next: (response) => {
            this.spinner.hide();
            this.toastr.showSucces('Inicio Sesión', 'Usuario Logueado Exitosamente');
            this.router.navigateByUrl('/dashboard/registered-student-list');

          },
          // Levanta alerta de error al usuario
          error: (response) => {
            this.spinner.hide();
            const title = 'Inicio Sesión';
            const message = response.error.error
            this.toastr.showError(title, message);
            // this.router.navigateByUrl('/sign');
          } 
        })
      }, 500);
    } 
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  public noSpacesRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      if (!value || value.length === 0 || value.length < 3) {
        return { requiredSpaces: true }; // Error si está vacío o solo tiene espacios
      }
      return null; // Sin error
    };
  }

}
