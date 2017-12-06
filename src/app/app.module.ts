import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import { TabsModule } from "ng2-tabs";
// import { TabsModule } from "ngx-tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {authConfig, firebaseConfig} from "environments/firebaseConfig";
import {AngularFireModule} from "angularfire2";
import {AuthService} from "app/shared/auth.service";
import {LoginUserComponent} from "app/login-user/login-user.component";
import {DisplayUserComponent} from "app/display-user/display-user.component";
import {RegisterUserComponent} from "app/register-user/register-user.component";
import {AlertModule} from "ng2-bootstrap";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ManageScheduleComponent } from './manage-schedule/manage-schedule.component';

@NgModule({
    declarations: [
        AppComponent,
        DisplayUserComponent,
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent,
        ManageScheduleComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, authConfig),
        TabsModule
    ],
    providers: [ AuthService ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
