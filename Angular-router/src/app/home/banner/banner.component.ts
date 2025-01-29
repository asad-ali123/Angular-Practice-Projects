import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})

export class BannerComponent {
  router: Router = inject(Router)
  onSearch(val: string) {
    this.router.navigate(['/courses'] , {queryParams:{search: val}})
    // console.log(val)

  }
}
