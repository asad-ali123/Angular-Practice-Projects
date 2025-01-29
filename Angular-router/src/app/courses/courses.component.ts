import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../Models/course';
import { CourseService } from '../Services/course.service';
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  router: Router = inject(Router)
  coursesService = inject(CourseService);
  authServices = inject(AuthService);
  AllCourses !: Course[];
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  searchString !: any;

  ngOnInit() {
    // this.searchString = this.activeRoute.snapshot.queryParams['search'];
    // this.searchString = this.activeRoute.snapshot.queryParamMap.get('search');
    // console.log(this.searchString);

    this.activeRoute.queryParamMap.subscribe((data) => {
      this.searchString = data.get('search');

      // Show All courses

      if (this.searchString === undefined || this.searchString === "" || this.searchString === null) {
        // this.coursesService.getAllcourses().subscribe((data) => {
        //   this.AllCourses = data;
        // }); 
        this.AllCourses= this.activeRoute.snapshot.data['courses'];
      } else {
        this.AllCourses = this.coursesService.courses.filter(data => data.title.toLowerCase().includes(this.searchString));
      }

    });
  };



}
