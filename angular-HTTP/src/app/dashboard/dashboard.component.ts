import { Component } from '@angular/core';

import { OverviewComponent } from "./overview/overview.component";
import { StatusComponent } from "./status/status.component";


@Component({
  selector: 'app-dashboard',
  imports: [OverviewComponent, StatusComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


}
