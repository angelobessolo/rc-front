import { Component, inject, signal } from '@angular/core';
import { GeneralTable } from "../../../../shared/components/general-table/general-table";
import { FloatButton } from '../../../../shared/interfaces/float-button.interface';
import { FloatButtonComponent } from '../../../../shared/components/float-button/float-button.component';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrAlertService } from '../../../../shared/services/toastr-alert/toastr-alert.service';

@Component({
  selector: 'app-registered-students',
  imports: [
    GeneralTable,
    FloatButtonComponent
  ], 
  templateUrl: './registered-students.html',
  styleUrl: './registered-students.css'
})
export class RegisteredStudents {
  public router = inject(Router);
  private spinner = inject(NgxSpinnerService);
  private toastr  = inject(ToastrAlertService);
  private adminService = inject(AdminService);

  public pathService: string = 'register-student/get-all-registered-students';

  public showButton = signal<boolean>(false)
  public reload = signal<boolean>(false)

  public buttonActions: FloatButton = {
    action: 'none',
    icon: 'widgets',
    label: '',
    color: 'primary',
    subActions: [
      { 
        action: 'create', 
        icon: 'add', 
        label: 'Registrar estudiante', 
        color: 'primary' 
      }
    ]
  };

  public defaultButtonActions: FloatButton = {
    action: 'none',
    icon: 'widgets',
    label: '',
    color: 'primary',
    subActions: [
      { 
        action: 'create', 
        icon: 'add', 
        label: 'Registrar estudiante', 
        color: 'primary' 
      }
    ]
  };

  public onlyOneRowSelectedButton: FloatButton = {
    action: 'none',
    icon: 'widgets',
    label: '',
    color: 'primary',
    subActions: [
      { 
        action: 'edit', 
        icon: 'edit', 
        label: 'Editar', 
        color: 'primary' 
      },
      { 
        action: 'downloadDocument', 
        icon: 'cloud_download', 
        label: 'Descargar', 
        color: 'primary' 
      },
      { 
        action: 'delete', 
        icon: 'delete', 
        label: 'Eliminar', 
        color: 'primary' 
      }
    ]
  };

  public toManyRowSelectedButton: FloatButton = {
    action: 'none',
    icon: 'widgets',
    label: '',
    color: 'primary',
    subActions: [
      { 
        action: 'delete', 
        icon: 'delete', 
        label: 'Eliminar', 
        color: 'primary' 
      }
    ]
  };

  public selectedData = signal<any[]>([]);

  constructor(){}

  public dataSelected(event: any){
    this.selectedData.set(event);

    if (event.length === 0){
      this.showButton.set(true);
      this.buttonActions = this.defaultButtonActions;
    }else if(event.length === 1){
      this.showButton.set(true);
      this.buttonActions = this.onlyOneRowSelectedButton;
    }else if(event.length > 1){
      this.showButton.set(true);
      this.buttonActions = this.toManyRowSelectedButton;
    }

    // this.data = event;

    // setInterval(() =>{
    //   this.reload.set(!this.reload());
    //   console.log('valor', this.reload())
    // }, 5000)
  }

  public eventAction(event: any){
    
    switch (event.action){
      case 'create':
        this.router.navigateByUrl('dashboard/register-student');
      break;

      case 'edit':
        const row = this.selectedData()[0];
        const id = row.id
        this.router.navigateByUrl(`dashboard/edit/${id}`);
      break;

      case 'downloadDocument':
        this.downloadDocument(this.selectedData())
      break;

      case 'delete':
        this.deleteRegisterStudent(this.selectedData())

        this.showButton.set(false);
      break;
    }  
  }

  public deleteRegisterStudent(registers: any[]) {
    this.reload.set(false);
    this.spinner.show();

    registers.map((reg: any) =>{
      setTimeout(() => {
        this.adminService.deleteRegisterStudent(reg.id).subscribe({
          next: (response: any) => {
            this.spinner.hide();
            this.toastr.showSucces('Eliminar Registro', response.message);
          },
          error: (err) => {
            this.spinner.hide();
            const title = 'Eliminar Registro';
            const message = err.message;
            this.toastr.showError(title, message);
          }
        });
      }, 500);
    })

    setTimeout(() => {
      this.reload.set(true);
    }, 1000)
    // this.spinner.hide();
  }

  public downloadDocument(registers: any[]) {
    this.reload.set(false);
    this.spinner.show();

    registers.map((reg: any) =>{
      setTimeout(() => {
        this.adminService.downloadDocument(reg.id).subscribe({
          next: (response: any) => {
            this.spinner.hide();
            this.toastr.showSucces('Descarga Documento', response.message);

            const base64 = response.data.document;
            const filename = response.data.filename || 'registro_estudiante.pdf';

            // Decodificar base64 a bytes
            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // Crear Blob y descargar
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);

          },
          error: (err) => {
            this.spinner.hide();
            const title = 'Descarga Documento';
            const message = err.message;
            this.toastr.showError(title, message);
          }
        });
      }, 500);
    })
  }
}
