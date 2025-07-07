import { Component } from '@angular/core';
import { InscribeStudent } from '../../../../shared/components/inscribe-student/inscribe-student';

@Component({
  selector: 'app-register-student',
  imports: [
    InscribeStudent
  ],
  templateUrl: './register-student.html',
  styleUrl: './register-student.css'
})
export class RegisterStudent {

}
