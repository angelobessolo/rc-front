import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environments';
import { GeneralListResponse } from '../../../shared/interfaces/data-list.interface';
import { blob } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;

  private userDetailSource = new BehaviorSubject<any>({});
  userDetail$ = this.userDetailSource.asObservable();    

  constructor() { }

  // ******************** Metodos Cordination ********************
  public getAllCordinations(): Observable<any>{
    const url = `${this.baseUrl}/cordination/get-all-cordinations`;

    let headers = new HttpHeaders();
    // Verificar si estamos en el navegador antes de usar localStorage
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    }
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public createCordination(body: any): Observable<any>{
    const url = `${this.baseUrl}/admin/cordination`;
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.post<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public updateCordination(id: string, body: any): Observable<any>{
    const url = `${this.baseUrl}/admin/cordination/${id}`;
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.patch<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  // changeStatus(cordination: DocumentCordination): Observable<any>{
  //   const url = `${this.baseUrl}/admin/cordination/status/${cordination._id}`;

  //   const body = {
  //     isActive: !cordination.isActive
  //   };

  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
  //   return this.http.patch<any>(url, body, {headers})
  //     .pipe(
  //       map(res =>{
  //         return res;
  //       }),
          
  //       // Return Errors
  //       catchError( err =>{
  //         return throwError(() => err);
  //       })
        
  //     );
  // }


  // ******************** Metodos TypeProgram ********************
  public getAllTypePrograms(): Observable<any>{
    const url = `${this.baseUrl}/admin/type-program/get-all-type-programs`

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public updateProgramType(id: number, body: any): Observable<any>{
    const url = `${this.baseUrl}/admin/program-type/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);

    return this.http.patch<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }


  // ******************** Metodos TypeModality ********************
  public createModalityType(body: any): Observable<any>{
    const url = `${this.baseUrl}/admin/type-modality`;
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.post<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public getAllTypeModalities(): Observable<any>{
    const url = `${this.baseUrl}/admin/type-modality/get-all-type-modalities`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public getRegisterStudent(id: number): Observable<any>{
    const url = `${this.baseUrl}/register-student/get-register-student/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public updateModalityType(id: number, body: any): Observable<any>{
    const url = `${this.baseUrl}/admin/modality-type/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);

    return this.http.patch<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }


  // ******************** Metodos Program ********************
  public getAllPrograms(): Observable<any>{
    const url = `${this.baseUrl}/program/get-all-programs`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public getProgramsByType(_idtypeProgram: any): Observable<any>{
    const url = `${this.baseUrl}/admin/program-by-type-program/${_idtypeProgram}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public createProgram(body: any): Observable<any>{
    const url = `${this.baseUrl}/admin/program`;
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.post<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public changeStatusProgram(program: any): Observable<any>{
    const url = `${this.baseUrl}/admin/program/status/${program._id}`;

    const body = {
      isActive: !program.isActive
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.patch<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public updateProgram(id: string, body: any): Observable<boolean>{
    const url = `${this.baseUrl}/admin/program/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);

    return this.http.patch<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }


  // ******************** Metodos para params ******************** 
  public getParamByCode(code: number): Observable<any>{
    const url = `${this.baseUrl}/admin/param-by-code/${code}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, { headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public createParam(body: any): Observable<any>{
    const url = `${this.baseUrl}/admin/param`;
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.post<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public updateParam(id: string, body: any): Observable<boolean>{
    const url = `${this.baseUrl}/admin/param/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);

    return this.http.patch<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public getRoleModules(id: number): Observable<any>{
    const url = `${this.baseUrl}/role/role-modules/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
            
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public updateRoleModules(roleModules: any, id: number): Observable<any>{
    const url = `${this.baseUrl}/role/role-modules/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.patch<any>(url, roleModules, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
            
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public createRoleModules(body: any): Observable<any>{
    const url = `${this.baseUrl}/role/role-module`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.post<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
            
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }


  // ******************** Metodos para users ******************** 
  public createUser(body: any): Observable<any>{
    const url = `${this.baseUrl}/auth`;
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);

     return this.http.post<any>(url, body, { headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public updateUser(id: number, body: any): Observable<any>{
    const url = `${this.baseUrl}/user/${id}`;
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);

     return this.http.patch<any>(url, body, { headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public getAllUsers(): Observable<GeneralListResponse>{
    const url = `${this.baseUrl}/user-get-all-users`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);

    return this.http.get<GeneralListResponse>(url, { headers })
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public getUserDetail(id: number): Observable<boolean>{
    const url = `${this.baseUrl}/user/${id}`;
    
    return this.http.get<any>(url)
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public viewUser(id: number): Observable<any>{
    const url = `${this.baseUrl}/user/view-user/${id}`;
   
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);

    return this.http.get<any>(url, { headers })
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  // Crear estudiante
  public changeStatusUser(user: any): Observable<any>{
    const url = `${this.baseUrl}/users/status/${user._id}`;

    const body = {
      isActive: !user.isActive
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.patch<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  // updateUser(id: string, userUpdate: any): Observable<boolean>{
  //   console.log('id del userdetail a actualizar', id);
  //   const url = `${this.baseUrl}/users/updateUser/${id}`;
  //   const body = userUpdate;
  //   return this.http.patch<any>(url, body)
  //     .pipe(
  //       map(res =>{
  //         // const updatedUserDetail = res.user;
  //         // console.log('Datos recibidos para actualización:', updatedUserDetail);
  //         // this.userDetailSource.next(updatedUserDetail); // Emitir nuevo valor
  //         // return updatedUserDetail;

  //         return res;
  //       }),
          
  //       // Return Errors
  //       catchError( err =>{
  //         return throwError(() => err);
  //       })
        
  //     );
  // }

  public updateUserImage(photo: string): Observable<boolean>{
    const url = `${this.baseUrl}/users/updateUserImage`;
    const body = {
      photo: photo
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
 
    return this.http.post<any>(url, body, { headers})
      .pipe(
        map(res =>{
          const updatedUserDetail = res.user;
          this.userDetailSource.next(updatedUserDetail); // Emitir nuevo valor
          return updatedUserDetail;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }


  // ******************** Metodos Estudiantes ********************

  // Crear estudiante
  public createStudent(student: any): Observable<any>{
    const url = `${this.baseUrl}/student/`;

    const body = student;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.post<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public createStudentProgram(studentForm: any): Observable<any>{
    const url = `${this.baseUrl}/register-student/`;

    const body = studentForm;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.post<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
      );
  }

  public updateStudentProgram(id: any, studentForm: any): Observable<any>{
    const url = `${this.baseUrl}/register-student/${id}`;

    const body = studentForm;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.patch<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
      );
  }

  // Obtener estudiantes
  public getStudents(): Observable<boolean>{
    const url = `${this.baseUrl}/student/get-all-students`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, { headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }


  // ******************** Metodos Params ********************
  // Obtener tipos de documentos
  public getTypeDocuments(): Observable<any>{
    const url = `${this.baseUrl}/type-documents/get-all-type-documents`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, { headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public getAllParams(): Observable<any>{
    const url = `${this.baseUrl}/admin/param/getAll`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  
  // ******************** Metodos country ********************
  public getAllCountries(): Observable<any>{
    const url = `${this.baseUrl}/admin/country/get-all-countries`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }


  // ******************** Metodos state ********************
  public getAllStates(): Observable<any>{
    const url = `${this.baseUrl}/admin/state/get-all-states`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  
  // ******************** Metodos city ********************
  public getAllCities(): Observable<any>{
    const url = `${this.baseUrl}/admin/city/get-all-cities`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }


  // ******************** Metodos Group ********************
  public getAllGroups(): Observable<any>{
    const url = `${this.baseUrl}/group/get-all-groups`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  // ******************** Metodos cycles ********************
  public getAllCycles(): Observable<any>{
    const url = `${this.baseUrl}/admin/cycles/get-all-cycles`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  // ******************** Metodos contents ********************
  public getAllCcontents(): Observable<any>{
    const url = `${this.baseUrl}/admin/contents/get-all-contents`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<any>(url, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }


  // Genericos que sirven para todos 
  public changeGenericStatus(path: string, _id: string, newValue: boolean): Observable<any>{
    const url = `${this.baseUrl}/${path}/${_id}`;

    const body = {
      isActive: !newValue
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.patch<any>(url, body, {headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public getDataTable(pathService: string): Observable<GeneralListResponse>{
    const url = `${this.baseUrl}/${pathService}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get<GeneralListResponse>(url, { headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          return throwError(() => err);
        })
        
      );
  }

  public deleteRegisterStudent(id: number): Observable<any>{
    const url = `${this.baseUrl}/register-student/delete-register-student/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.delete<any>(url, { headers})
      .pipe(
        map(res =>{
          return res;
        }),
          
        // Return Errors
        catchError( err =>{
          console.log(err); 
          return throwError(() => err);
        })
        
      );
  }

  public downloadDocument(id: number): Observable<any>{
    const url = `${this.baseUrl}/register-student/register-bill/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    
    return this.http.get(url, { headers }); 
  }
}
