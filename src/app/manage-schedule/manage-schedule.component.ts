import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from "rxjs";
import { TabsModule } from "ng2-tabs";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from "app/shared/auth.service";
import { UserInfo } from "app/shared/user-info";

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.css']
})
export class ManageScheduleComponent implements OnInit {
  @Output() onEnrolled = new EventEmitter();
  @Output() onEnrollmentError = new EventEmitter();
  @Output() onRemoved = new EventEmitter();
  dates: Observable<any[]>;
  user: UserInfo;

  constructor(private angularFire: AngularFire, private authService: AuthService) {
    this.dates = angularFire.database.list('/dates').do(dates => {
      dates.forEach(date => {
        date.times = angularFire.database.list(`/dates/${date.$key}/times`).do(times => {
          times.forEach(time => {
            time.courses = angularFire.database.list(`/dates/${date.$key}/times/${time.$key}/courses`).do(courses => {
              courses.forEach(course => {
                course.enrollment = angularFire.database.list(`/dates/${date.$key}/times/${time.$key}/courses/${course.$key}/enrollment`)
              });
            });
          });
        });
      });
    });

    this.authService.currentUser().subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit() {
    
  }


  enroll(date, time, course) {
    let enrollments = this.angularFire.database.object(`/enrollments/${this.user.uid}`);
    enrollments.set(this.user).then(() => {
      let enrollment = this.angularFire.database.object(`/dates/${date.$key}/times/${time.$key}/courses/${course.$key}/enrollment/${this.user.uid}`);
      enrollment.update(this.user).then(() => this.onEnrolled.emit({date, time, course})).catch(error => this.onEnrollmentError.emit('This course is full.'));
    }).catch(error => {
      this.onEnrollmentError.emit('You already have a enrollment in a course, pleas remove it.');
    });
  }

  remove(date, time, course){
    let enrollments = this.angularFire.database.object(`/enrollments/${this.user.uid}`);
    enrollments.set(null);
    let enrollment = this.angularFire.database.object(`/dates/${date.$key}/times/${time.$key}/courses/${course.$key}/enrollment/${this.user.uid}`);
    enrollment.remove().then(() => this.onRemoved.emit({date, time, course})).catch(error => this.onEnrollmentError.emit('Something went wrong.'));
  }

  currentUser(): Observable<UserInfo> {
    return this.authService.currentUser();
  }

}
