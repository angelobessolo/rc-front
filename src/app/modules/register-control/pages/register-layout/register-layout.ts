import { Component } from '@angular/core';
import { ToolBar } from '../../components/tool-bar/tool-bar';
import { InscribeStudent } from '../../../../shared/components/inscribe-student/inscribe-student';

@Component({
  selector: 'app-register-layout',
  imports: [
    InscribeStudent,
    ToolBar,
  ],
  templateUrl: './register-layout.html',
  styleUrl: './register-layout.css'
})
export class RegisterLayout {

}
