import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../auth/services/auth.service';
import { ToastrAlertService } from '../../../../shared/services/toastr-alert/toastr-alert.service';

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
export class ToolBar {
  private router      = inject(Router);
  private authService = inject(AuthService);
  private toastr      = inject(ToastrAlertService);
  private spinner     = inject(NgxSpinnerService);

  constructor(){}

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
