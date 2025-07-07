import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolBar } from '../../../../shared/components/tool-bar/tool-bar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    ToolBar,
    MatButtonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {

}
