import { Component, inject, OnInit } from '@angular/core';
import { BannerComponent } from "./banner/banner.component";
import { PopularComponent } from "./popular/popular.component";
import { TestimonyComponent } from "./testimony/testimony.component";
import { ServicesComponent } from "./home-services/services.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [BannerComponent, PopularComponent, TestimonyComponent, ServicesComponent, ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute)
  ngOnInit(): void {
    this.activeRoute.fragment.subscribe((data) => {
      this.goToSection(data)
    })

  }
  goToSection(section: any) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }
}
