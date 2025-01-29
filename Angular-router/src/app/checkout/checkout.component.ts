import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);
  course: any;


  ngOnInit() {
    // use for static data passing
    // this.activeRoute.data.subscribe((data) => [
    //   this.course = data
    // ])

    // use for dynamic data
    // this.course = this.router.getCurrentNavigation()?.extras.state

    this.course = history.state;
  }




}
