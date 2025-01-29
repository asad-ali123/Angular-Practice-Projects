import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../../Models/course';
import { CourseService } from '../../Services/course.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cousres-details',
  imports: [RouterModule],
  templateUrl: './cousres-details.component.html',
  styleUrl: './cousres-details.component.css'
})
export class CousresDetailsComponent implements OnInit {
  selectedCourse!: Course;
  courseId!: number;

  private courseService: CourseService = inject(CourseService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  paramMaoObs: any;

  ngOnInit() {
    // *old way to get values of  activated route
    // this.courseId = this.activeRoute.snapshot.params['id'];
    //* New way 
    // this.courseId =  Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.paramMaoObs = this.activeRoute.paramMap.subscribe((data) => {
      this.courseId = Number(data.get('id'));
      this.selectedCourse = this.courseService.courses.find(course => course.id === this.courseId)!;

    })
    //  this.selectedCourse =  this.courseService.courses.find(course => course.id === this.courseId) || {} as Course;

  }
  ngOnDistroy() {
    this.paramMaoObs.unsubscribe();
  }
}
