import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { ToastrAlertService } from '../../services/toastr-alert/toastr-alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tool-bar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  templateUrl: './tool-bar.html',
  styleUrl: './tool-bar.css'
})
export class ToolBar implements OnInit{
  private router      = inject(Router);
  private authService = inject(AuthService);
  private toastr      = inject(ToastrAlertService);
  private spinner     = inject(NgxSpinnerService);

  userParams = signal<any>({});

  constructor(){}

  ngOnInit(): void {
    const userParamsEncoded = localStorage.getItem('userParams');
    if (userParamsEncoded) {
      const decodedString = atob(userParamsEncoded); // Decodifica base64 a string JSON
      this.userParams.set(JSON.parse(decodedString));  // Parsea el string a objeto
    }
  }

  public logout(){
    this.spinner.show();
    setTimeout(() => { 
      this.authService.logout().subscribe({
        next: (response) => {
          this.spinner.hide();
          // Levanta alerta de error al usuario
          this.toastr.showSucces('Finalizar Sesión', 'Sesión Finalizada Exitosamente');
          this.router.navigateByUrl('/auth');
        },
        error: (response) => {
          this.spinner.hide();
        } 
      })
    }, 500); 
  }
}
