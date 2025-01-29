import { Component, inject } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { Course } from '../../Models/course';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular',
  imports: [CommonModule , RouterLink],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent {
  // constructor(private router: Router){}
  //* another way to create an instance of Router
  router : Router = inject(Router);
activeRoute : ActivatedRoute = inject(ActivatedRoute)
  courseService = inject(CourseService)
  popularCourses: Course[] = [];

  ngOnInit() {
    this.popularCourses = this.courseService.courses.filter(c => c.rating >= 4.5);
  }


  goToCourses(){
// this.router.navigate([ 'courses' ]);
// this.router.navigate(['courese'] , {relativeTo : this.activeRoute})


this.router.navigateByUrl('courses')
  }
}
