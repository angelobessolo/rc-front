import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnDestroy, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDialogActions } from '@angular/material/dialog';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MultiSelectSearch } from '../multi-select-search/multi-select-search';
import { AdminService } from '../../../modules/dashboard/services/admin.service';
import { ToastrAlertService } from '../../services/toastr-alert/toastr-alert.service';
import { Router } from '@angular/router';

const moment = _rollupMoment || _moment;


@Component({
  selector: 'app-inscribe-student',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    CommonModule, 
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    NgxSpinnerModule, 
    MatSlideToggleModule,
    NgxMatSelectSearchModule,
    MultiSelectSearch
  ],
  templateUrl: './inscribe-student.html',
  styleUrl: './inscribe-student.css',
})
export class InscribeStudent implements OnInit{
  // Injeccion dependencias y servicios
  private adminService   = inject(AdminService);
  private spinner        = inject(NgxSpinnerService);
  private toastr         = inject(ToastrAlertService);
  private formBuilder    = inject(FormBuilder);
  private router         = inject(Router);

  // Input signals
  public showFields = input<boolean>(true);

  // Formulario
  createStudentForm!: FormGroup;
  
  // Listados formulario
  public typeDocuments: any[] = [];
  public groups: any[] = [];
  public typePrograms: any[] = [];
  public programs: any[] = [];
  public filteredPrograms: any[] = [];
  public filteredTechPrograms: any[] = [];
  public modalities: any[] = [];
  public availableCycles: any = [];
  public availableContents: any = [];


  public selectDocumentList: any[] = [
    {
      id: 1,
      description: 'Documento de Identificación'
    },
    {
      id: 2,
      description: 'Prueba de Validación de Conocimientos'
    },
    {
      id: 3,
      description: 'Comprobante de Pago'
    },
    {
      id: 4,
      description: 'Documento del Acudiente'
    },
    {
      id: 5,
      description: 'Certificado quinto'
    },
    {
      id: 6,
      description: 'Certificado sexto'
    },
    {
      id: 7,
      description: 'Certificados sexto - séptimo'
    },
    {
      id: 8,
      description: 'Certificado sexto - séptimo - octavo'
    },
    {
      id: 9,
      description: 'Certificado sexto - séptimo - octavo - noveno'
    },
    {
      id: 10,
      description: 'Certificado sexto - séptimo - octavo - noveno - décimo'
    },
    {
      id: 11,
      description: 'Certificado de noveno grado'
    },
    {
      id: 12,
      description: 'Certificado de décimo grado'
    },
    {
      id: 13,
      description: 'Certificado de Bachiller'
    },
  ];


  public student!: any;
  flgPayApply = false;
  public selectedProgram: any;
  
  selectedConcept: number | null = null;
  customConcept: string = '';
  isOtherConceptSelected: boolean = false;
  public titleToastAlert: string = 'Inscripción de programa académico';

  readonly date = new FormControl(moment());

  public showProgram = signal<boolean>(false);
  public showCycle = signal<boolean>(false);

  // public banks: any[] = this.documents;
  public bankMultiCtrl: FormControl<any[] | null> = new FormControl<any[] | null>([]);
  public bankMultiFilterCtrl: FormControl<string | null> = new FormControl<string | null>('');
  public filteredBanksMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  public documentsControl: any;

  form!: FormGroup;

  constructor() {}
  
  ngOnInit(): void {    
    // Aquí instanciamos el FormGroup y definimos los controles para matricula de programa academico
    this.createStudentForm = this.formBuilder.group({
      names:             ['', Validators.required],
      sureNames:         ['', Validators.required],
      typeDocumentsId:   ['', Validators.required],
      documentNumber:    ['', Validators.required],
      expeditionPlace:   ['', Validators.required],
      age:               ['', [Validators.required]],
      email:             ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      bornDate:          ['', [Validators.required]],
      state:             ['', Validators.required],
      city:              ['', Validators.required],
      neighborhood:      ['', Validators.required],
      address:           ['', Validators.required],
      phoneNumber:       ['', [Validators.required]],
      secondPhoneNumber: [''],
      typeProgramsId:    ['', Validators.required],
      modalityId:        [''],  
      programsId:        ['', Validators.required],
      cyclesProgramsId:  [''],
      groupsId:          [''],
      graduationYear:    [''],
      agent:             [''],
      documents:         [''],
      observation:       [''],
      cyclesContent: this.formBuilder.array([])
    });
    
    this.documentsControl = this.createStudentForm.get('documents') as FormControl<any[] | null>;

    // this.addCycle();
    
    

    // Consumos para selects del formulario 
    this.getTypeDocuments();
    this.getAllGroups();
    this.getAllTypePrograms();
    this.getAllPrograms();
    this.getModalities();
    this.getAllCycles();
    this.getAllContents();


    // Escuchar cambios en el formulario
    this.createStudentForm.valueChanges.subscribe(values => {
      const typeProgramId = this.createStudentForm.get('typeProgramsId')?.value;
      const modalityId = this.createStudentForm.get('modalityId')?.value;

      // Se filrtran los programas por tipo y modalidad
      if (typeProgramId && modalityId){
        this.filteredPrograms = this.programs.filter(program => {
          return program.typeModality.id === modalityId && program.typeProgram.id === typeProgramId;
        })

        this.filteredTechPrograms = this.programs.filter(program => {
          return program.typeModality.id === modalityId && program.typeProgram.id === 2;
        })
      }
    });
  }
  
  public createStudentProgram(): void {
    // Se conculta si el usuario se logueo para redirigirlo al list ó es un estudiante
    const token = localStorage.getItem('token');

    let payload: any = {}

    const appRoot = document.querySelector('app-root');
    if (appRoot) {
      appRoot.classList.remove('blur-background'); // Quitar clase del app-root
    }

    this.spinner.show();
    setTimeout(() => {
      if (appRoot) {
        appRoot.classList.remove('blur-background'); // Añadir clase al app-root
      }

      let studentForm = this.createStudentForm.value;

      // Obligatorios
      payload.names = studentForm.names;
      payload.sureNames = studentForm.sureNames;
      payload.typeProgramsId = Number(studentForm.typeProgramsId);
      payload.programsId = Number(studentForm.programsId);
      payload.typeDocumentsId = Number(studentForm.typeDocumentsId);
      payload.expeditionPlace = studentForm.expeditionPlace;
      payload.documentNumber = Number(studentForm.documentNumber);
      payload.age = Number(studentForm.age);
      payload.email = studentForm.email;
      payload.bornDate = studentForm.bornDate;
      payload.state = studentForm.state;
      payload.city = studentForm.city;
      payload.neighborhood = studentForm.neighborhood;
      payload.address = studentForm.address;
      payload.phoneNumber = Number(studentForm.phoneNumber);
      payload.secondPhoneNumber = Number(studentForm.secondPhoneNumber);
     

      // Opcionales (solo se agregan si tienen valor)

      if (studentForm?.documents.length > 0){
        studentForm.documents = studentForm.documents.map((item: any) => item.description).join(', ');
        payload.documents = studentForm.documents;
      }

      if (studentForm?.cyclesProgramsId != ''){
        payload.cyclesProgramsId = Number(studentForm.cyclesProgramsId);
      }

      if (studentForm?.cyclesContent.length > 0){
        payload.cyclesContent = studentForm.cyclesContent;
      }

      if (studentForm.graduationYear !== '') {
        payload.graduationYear = Number(studentForm.graduationYear);
      }
      
      if (studentForm.groupsId !== '') {
        payload.groupsId = Number(studentForm.groupsId);
      }

      if (studentForm.agent !== '') {
        payload.agent = studentForm.agent;
      }

      if (studentForm.observation !== '') {
        payload.observation = studentForm.observation;
      }
     
      this.adminService.createStudentProgram(payload).subscribe({
        next: (response: any) => {
          this.spinner.hide();

          if (appRoot) {
            appRoot.classList.add('blur-background'); // Añadir clase al app-root
          }

          if (response.statusCode === 200) {
            const message = response.message;
            this.toastr.showSucces(this.titleToastAlert, message);

            this.createStudentForm.reset()

            // Si esta logueado se dirige al list
            if (token){
              this.router.navigateByUrl('dashboard/registered-student-list');
            }
          }
        },
        error: err => {
          this.spinner.hide();

          if (appRoot) {
            appRoot.classList.add('blur-background'); // Añadir clase al app-root
          }
          const message = err.error.error;
          this.toastr.showError(this.titleToastAlert, message);

        }
      })
    }, 
    500
    );
  }

  public selectTypeProgram(event: any): void {

  }
  
  public selectModality(event: any): void {
    this.initializeField('programsId', '');
  }

  // Método para manejar la selección del programa academico
  selectProgram(event: any): void {
    const id = event;
    const programLabel = 'Ciclos';

    // Desactiva para mostrar campos 1 Bachiller, 2 Ciclos, 3 Tecnicos
    this.showProgram.set(false);  
    this.showCycle.set(false);

    // Se valda si se tiene seleccionado un programa de bachillerato por ciclos
    const cycleProgram = this.filteredPrograms.find( program => program.id === id)

    if (cycleProgram.programName === programLabel){
      this.showCycle.set(true);
    }
    
  }

  public initializeField(field: string, value: any): void {
    this.createStudentForm.controls[field]?.setValue(value);
  }

  onDocumentsChanged(event: any) {
    const value = event.value;
    this.bankMultiCtrl.setValue(value);
  }

  public validateFieldNumberInput(event: Event, field: any): void {
    let input = event.target as HTMLInputElement;
    let value = parseInt(input.value, 10);
    let strValue = value.toString();

    const control = this.createStudentForm.get(field);

    // Validar que el campo exista en el formulario
    if (!control) {
      return;
    }

    if (isNaN(value)) {
      control.setValue(null);
      return;
    }

    switch (field){
      case 'age':
        const ageLength = 2

        if (isNaN(value)) {
          this.createStudentForm.get('age')?.setValue(null);
          return;
        }

        if (strValue.length > ageLength) {
          // Cortar a 10 dígitos exactos
          const trimmed = strValue.slice(0, ageLength);
          this.createStudentForm.get('age')?.setValue(Number(trimmed));
          return;
        }

        if (value < 0) {
          this.createStudentForm.get('age')?.setValue(1);
        }

      break;

      case 'phoneNumber':
        const maxLength = 10;

        if (isNaN(value)) {
          this.createStudentForm.get('phoneNumber')?.setValue(null);
          return;
        }

        if (strValue.length > maxLength) {
          // Cortar a 10 dígitos exactos
          const trimmed = strValue.slice(0, maxLength);
          this.createStudentForm.get('phoneNumber')?.setValue(Number(trimmed));
          return;
        }

        if (value < 0) {
          this.createStudentForm.get('phoneNumber')?.setValue(1);
        }

      break;

      case 'secondPhoneNumber':
        const maxLengthSecondNumber = 10;

        if (isNaN(value)) {
          this.createStudentForm.get('secondPhoneNumber')?.setValue(null);
          return;
        }

        if (strValue.length > maxLengthSecondNumber) {
          // Cortar a 10 dígitos exactos
          const trimmed = strValue.slice(0, maxLengthSecondNumber);
          this.createStudentForm.get('secondPhoneNumber')?.setValue(Number(trimmed));
          return;
        }

        if (value < 0) {
          this.createStudentForm.get('secondPhoneNumber')?.setValue(1);
        }

      break;

      case 'graduationYear':
        const gradeLength = 4;

        if (isNaN(value)) {
          this.createStudentForm.get('graduationYear')?.setValue(null);
          return;
        }

         if (strValue.length > gradeLength) {
          // Cortar a 10 dígitos exactos
          const trimmed = strValue.slice(0, gradeLength);
          this.createStudentForm.get('graduationYear')?.setValue(Number(trimmed));
          return;
        }

        if (value < 0) {
          this.createStudentForm.get('graduationYear')?.setValue(1);
        }

      break;
    }
  }

  public getErrorMessage(field: string): string {
    const control = this.createStudentForm.get(field);
    if (!control || !control.errors || !(control.dirty || control.touched)) return '';

    switch (field) {
      case 'names':
        if (control.errors['required']) return 'El campo es requerido';
        if (control.errors['maxlength']) return 'Máximo 50 caracteres';
      break;

      case 'sureNames':
        if (control.errors['required']) return 'El campo es requerido';
        if (control.errors['maxlength']) return 'Máximo 50 caracteres';
      break;

      case 'documentNumber':
        if (control.errors['required']) return 'El campo es requerido';
      break;

      case 'expeditionPlace':
        if (control.errors['required']) return 'El campo es requerido';
      break;

      case 'age':
        if (control.errors['required']) return 'El campo es requerido';
      break;

      case 'email':
        if (control.errors['required']) return 'El campo es requerido';
        if (control.errors['pattern']) return 'El campo no posee una estructura de correo electrónico valida';
      break;

      case 'bornDate':
        if (control.errors['required']) return 'El campo es requerido';
      break;

      case 'state':
        if (control.errors['required']) return 'El campo es requerido';
      break;

      case 'city':
        if (control.errors['required']) return 'El campo es requerido';
      break;

      case 'neighborhood':
        if (control.errors['required']) return 'El campo es requerido';
      break;

      case 'address':
        if (control.errors['required']) return 'El campo es requerido';
      break;

      case 'phoneNumber':
        if (control.errors['required']) return 'El número es obligatorio';
      break;

      case 'secondPhoneNumber':
        if (control.errors['required']) return 'El número es obligatorio';
      break;

      case 'graduationYear':
        if (control.errors['required']) return 'La edad es obligatoria';
      break;

      case 'agent':
        if (control.errors['required']) return 'La edad es obligatoria';
      break;

      case 'observation':
        if (control.errors['required']) return 'La edad es obligatoria';
      break;

      default: 
        if (control.errors['required']) return 'El campo es requerido';
    }

    return '';
  }

  // Consumos para listas de selects formularios
  public getTypeDocuments(){
    this.adminService.getTypeDocuments().subscribe({
      next: (response: any) => {
        this.typeDocuments = response.data.typeDocuments;
      },
      error: err => {

      }
    })
  };

  public getAllGroups(): void {
    this.adminService.getAllGroups().subscribe({
      next: (response: any) => {
        this.groups = response.data.groups; 
      },
      error: err => {

      }
    })
  };

  public getAllTypePrograms(){
    this.adminService.getAllTypePrograms().subscribe({
      next: (response: any) => {
        this.typePrograms = response.data.typePrograms;
      },
      error: err => {

      }
    })
  };

  public getAllPrograms(){
    this.adminService.getAllPrograms().subscribe({
      next: (response: any) => {
        this.programs = response.data.programs;
        this.filteredPrograms = this.programs;
        this.filteredTechPrograms = this.programs.filter( (program) => program.typeProgram.id === 2 )
      },
      error: err => {

      }
    })
  };

  public getModalities(){
    this.adminService.getAllTypeModalities().subscribe({
      next: (response: any) => {
        this.modalities = response.data.typeModalities;
        this.createStudentForm.controls['modalityId'].setValue(this.modalities[0].id);
      },
      error: err => {

      }
    })
  };

  public getAllCycles(){
    this.adminService.getAllCycles().subscribe({
      next: (response: any) => {
        this.availableCycles = response.data.cycles;
      },
      error: err => {

      }
    })
  };

  public getAllContents(){
    this.adminService.getAllCcontents().subscribe({
      next: (response: any) => {
        this.availableContents = response.data.contents;
      },
      error: err => {

      }
    })
  };

























  get cyclesContent(): FormArray {
    return this.createStudentForm.get('cyclesContent') as FormArray;
  }

  addCycle() {
    this.cyclesContent.push(this.formBuilder.group({
      cyclesId: ['', Validators.required],
      contentId: ['', Validators.required]
    }));
  }

  removeCycle(index: number) {
    this.cyclesContent.removeAt(index);
  }

  // getUsedCycles(): string[] {
  //   return this.cycles.controls.map(c => c.value.cycle);
  // }
  getUsedCycles(): number[] {
    return this.cyclesContent.controls
      .map(c => c.value.cyclesId)
      .filter(cycle => cycle !== '' && cycle !== null && cycle !== undefined)
      .map((cycle: any) => typeof cycle === 'object' ? cycle.id : cycle);
  }

  getUsedContents(): string[] {
    return this.cyclesContent.controls.map(c => c.value.contentId);
  }

  // getAvailableCycles(index?: number): string[] {
  //   const used = this.getUsedCycles();

  //   // Permite mostrar siempre el valor ya seleccionado en la posición actual
  //   return this.availableCycles.filter((c, i) => {
  //     return index !== undefined
  //       ? !used.includes(c) || c === this.cycles.at(index).value.cycle
  //       : !used.includes(c);
  //   });
  // }
  getAvailableCycles(index?: number): any[] {
    const used = this.getUsedCycles();

    return this.availableCycles.filter((ciclo: any, i: number) => {
      if (index !== undefined) {
        // Permite el ciclo ya seleccionado en la posición actual
        const currentValue = this.cyclesContent.at(index).value.cyclesId;
        const currentId = typeof currentValue === 'object' ? currentValue.id : currentValue;
        return !used.includes(ciclo.id) || ciclo.id === currentId;
      } else {
        return !used.includes(ciclo.id);
      }
    });
  }

  getAvailableContents(index?: number): any[] {
    // const used = this.getUsedContents();

    // return this.availableContents.filter((c, i) => {
    //   return index !== undefined
    //     ? !used.includes(c) || c === this.cycles.at(index).value.content
    //     : !used.includes(c);
    // });
    return this.availableContents;
  }
}


