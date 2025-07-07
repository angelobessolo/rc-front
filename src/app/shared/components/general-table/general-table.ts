import { Component, effect, inject, input, Input, OnChanges, OnInit, output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { GeneralListResponse } from '../../interfaces/data-list.interface';
import { GeneralStatus } from '../../enums/general-status.enum';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrAlertService } from '../../services/toastr-alert/toastr-alert.service';
import { CommonModule, NgClass } from '@angular/common';
import { AdminService } from '../../../modules/dashboard/services/admin.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-general-table',
  imports: [
    CommonModule,
    MatCardModule, 
    MatMenuModule, 
    MatButtonModule, 
    MatTableModule, 
    MatPaginatorModule,  
    MatCheckboxModule, 
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    NgxSpinnerModule,
  ],
  templateUrl: './general-table.html',
  styleUrl: './general-table.css'
})

export class GeneralTable  implements OnInit{
  private adminService = inject(AdminService);
  private spinner = inject(NgxSpinnerService);
  private toastr  = inject(ToastrAlertService);

  @Input() pathService: string = 'register-student/get-all-registered-students';
  reload = input<boolean>(false);

  public dataSelected = output<any[]>();    // OutputEmitterRef<string>

  public displayedColumns: string[] = []; 
  public columnMappings: { [key: string]: string } = {};

  public dataSource = new MatTableDataSource<any>([]);
  public selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataList = signal<any[]>([]);
  public generalStatus = GeneralStatus;
  public rowData: any[] = [];
  public valuesDataService: any[] = [];

  // Flag load service 
  public loadService = signal<boolean>(false);

  constructor() {
    effect(() => {
      const value = this.reload(); // lee el valor de la signal
      if (value){
        this.reloadList();
      }
    });
  }

  ngOnInit(): void {
    this.getDataTable();
    // this.dataSource.data = data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Valida cambios en servicio para recargar lista
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  //   if (changes['reload'] && changes['reload'].currentValue) {
  //     this.reloadList();
  //   }
  // }

  // Search Filter
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getColumnValue(element: any, column: string): any {
    const valore = element[this.columnMappings[column] as keyof any] || ''
    
    return valore;
  }

  public getDataTable() {
    this.spinner.show();
    setTimeout(() => {
      this.adminService.getDataTable(this.pathService).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          // Asignar las columnas a mostrar
          this.displayedColumns = response.data.displayedColumns;
  
          // Asignar los mapeos de columnas (deberían ser clave-valor)
          this.columnMappings = response.data.columnMappings;
          this.valuesDataService = response.data.values;
          // Mapeamos los valores de los usuarios
          const data = response.data.values.map((row: any, index: number) => ({
            index: index + 1,  // Esto lo agregamos por conveniencia
            ...this.mapData(row)  // Mapeamos los datos del usuario
          }));

          this.dataList.set(data);
   
          // Asignamos los datos a la fuente de datos de la tabla
          this.dataSource.data = data;
  
          // Configuramos la paginación si la tienes configurada
          setTimeout(() => {
            if (this.paginator) {
              this.paginator.pageIndex = 0;
            }
            this.dataSource.paginator = this.paginator;
          }, 500);
  
          this.loadService.set(true);
        },
        error: (err) => {
          this.spinner.hide();
          const title = 'Error al cargar los usuarios';
          const message = err.message;
          this.toastr.showError(title, message);
        }
      });
    }, 500);
  }
  
  // Esta función mapea los datos del usuario utilizando los mapeos de columnas
  public mapData(user: any): any {
    const mappedData: any = {};
    
    // Mapeamos cada columna usando los mapeos definidos en `columnMappings`
    Object.keys(this.columnMappings).forEach((column) => {
      const mappedField = this.columnMappings[column];  // Obtenemos el campo mapeado
      mappedData[mappedField] = user[mappedField];  // Asignamos el valor correspondiente
    });
  
    return mappedData; 
  }

  // Inicializa variables y consumo para la tabla
  public reloadList(): void{
    this.dataSource.data = [];
    this.dataList.set([]);
    this.displayedColumns = [];  
    this.rowData = [];
    this.columnMappings = {};
    this.loadService.set(false);
    this.getDataTable();

    // this.showButton = false;
  }

  public selectedRowList(raw: any) {
    raw.selectedRow = !raw.selectedRow; // Cambiar el estado del item seleccionado
  
    // Si está seleccionado, agregarlo al array
    if (raw.selectedRow) {
      this.rowData.push(raw);

    } else {
      // Encontrar el índice del item en el array `rowUsers`
      const index = this.rowData.findIndex((user: any) => user._id === raw._id);
      
      // Si se encuentra, eliminarlo del array
      if (index !== -1) {
        this.rowData.splice(index, 1);
      }
    }
    
    // if (this.rowData.length > 0){
    //   console.log(this.rowData.length);
    //   // Emite data al padre el registro con los datos completos
    //   const rowFiltered = this.valuesDataService.filter(row => row.index == raw.index);
    //   console.log('valor retornado al padre', rowFiltered);
    //   this.dataSelected.emit(rowFiltered); 
    // }else{
    //   this.dataSelected.emit(this.rowData);
    // }

    if (this.rowData.length > 0) {
      // Mapeamos cada fila en rowData para obtener los datos completos
      const rowFiltered = this.rowData.map(row => {
        // Buscar en valuesDataService el dato correspondiente a la fila actual
        const completeData = this.valuesDataService.find(value => value.index === row.index);
        
        if (completeData) {
          // Si encontramos el dato completo, lo combinamos
          return { ...row, ...completeData };
        } else {
          // Si no se encuentra, devolvemos solo la fila original
          return row;
        }
      });
    
      // Emitimos el arreglo completo al padre
      this.dataSelected.emit(rowFiltered);
    }else{
      this.dataSelected.emit(this.rowData);
    }
  }
}