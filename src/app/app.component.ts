import {Component} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private title = 'Meet';
    private alertType = null;
    private alertMessage = "";

    constructor(private authService: AuthService) {
    }

    isLoggedIn(): Observable<boolean> {
        return this.authService.isLoggedIn();
    }

    onResetPasswordSuccess() {
        this.alertType = "success";
        this.alertMessage = "Reset Password Sent!";
    }

    onLoginSuccess() {
        this.alertType = "success";
        this.alertMessage = "Login Success!";
    }

    onRegisterSuccess() {
        this.alertType = "success";
        this.alertMessage = "User registered!";
    }

    onEnrolled(enrollment) {
        this.alertType = "success";
        this.alertMessage = `Successfully enrolled ${enrollment.course.title} on ${enrollment.date.title} at ${enrollment.time.title}`;
        window.scrollTo(0, 0);
    }

    onEnrollFail(warn) {
        this.alertType = "warning";
        this.alertMessage = warn;
        window.scrollTo(0, 0);
        console.warn(warn);
    }

    onRemoved(enrollment) {
        this.alertType = "success";
        this.alertMessage = `Successfully removed ${enrollment.course.title} on ${enrollment.date.title} at ${enrollment.time.title}`;
        window.scrollTo(0, 0);
    }

    onError(err) {
        this.alertType = "danger";
        this.alertMessage = err;
    }

    onLoggedOut() {
        // Just reset any displayed messsage.
        this.alertType = null;
        this.alertMessage = "";
    }

    alertClosed() {
        this.alertType = null;
        this.alertMessage = "";
    }
}
