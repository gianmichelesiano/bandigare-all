import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialMod } from './material.mod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdInputModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import { RouterModule, Routes} from '@angular/router';
import {MatTabsModule} from '@angular/material';
import {MatTableModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { ChartsModule } from 'ng2-charts';
import {MatExpansionModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import {MatChipsModule} from '@angular/material';
import {BusyModule} from 'angular2-busy';
import { AngularFireAuth } from 'angularfire2/auth';
import {MatSnackBarModule} from '@angular/material';
import {TJsonViewerModule} from 't-json-viewer';
import { EmailValidator } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {MatDialogModule} from "@angular/material";
import { MyDataService } from './services/mydataservice';


import { AppComponent, Home, appRoutes } from './app.component'; 
import { ClientComponent } from './client/client.component';
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormPageComponent } from './form-page/form-page.component';
import { MytasksComponent } from './mytasks/mytasks.component';
import { FirestoreSampleComponent } from './firestore-sample/firestore-sample.component';
import { DatabaseComponent } from './database/database.component';
import { UserComponent } from './user/user.component';
import { DatatableComponent } from './datatable/datatable.component';
import { DoughnutChartGSComponent } from './doughnut-chart-gs/doughnut-chart-gs.component';
import {MatGridListModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import { BvdComponent } from './bvd/bvd.component';
import { SmartkycComponent } from './smartkyc/smartkyc.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { TwitterComponent } from './twitter/twitter.component';
import { ZefixComponent } from './zefix/zefix.component';
import { DetailZefixComponent } from './detail-zefix/detail-zefix.component';
import { PdfComponent } from './pdf/pdf.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.service';
import { AuthenticationService } from './authentication.service';
import { AuthApiService } from './authapi.service';
import { AuthAPI } from './auth.api';
import { WindowService } from './window.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { MyMapComponent } from './my-map/my-map.component';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';
import { SearchListComponent } from './search-list/search-list.component';
import { JsonPageComponent } from './json-page/json-page.component';
import { NetworkVisComponent } from './network-vis/network-vis.component';
import { NetworkComponent } from './network/network.component';
import { CompanyHouseComponent } from './company-house/company-house.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { DialogsService } from './dialogs/dialogs.service';
import { DialogsModule } from './dialogs/dialogs.module';
import { RicercaComponent } from './ricerca/ricerca.component';





@NgModule({
  declarations: [
    AppComponent,
    Home,
    ClientComponent,
    CompanyComponent,
    DashboardComponent,
    FormPageComponent,
    MytasksComponent,
    FirestoreSampleComponent,
    DatabaseComponent,
    UserComponent,
    DatatableComponent,
    
    DoughnutChartGSComponent,
    
    BvdComponent,
    
    SmartkycComponent,
    
    RadarChartComponent,
    
    TwitterComponent,
    
    ZefixComponent,
    
    DetailZefixComponent,
    
    PdfComponent,
    
    
    SignupComponent,
    
    MembersComponent,
    
    LogoutComponent,
    
    BarChartComponent,
    
    GoogleMapComponent,
    
    PersonalDataComponent,
    
    MyMapComponent,
    
    VerifyMailComponent,
    
    SearchListComponent,
    
    JsonPageComponent,
    
    NetworkVisComponent,
    
    NetworkComponent,
    
    CompanyHouseComponent,
    
    
    ForgotPasswordComponent,
    
    
    LoginComponent,
    
    
    RegistrazioneComponent,
    
    
    RicercaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BusyModule,
    ToastModule.forRoot(),
    RecaptchaModule.forRoot(),
    FormsModule,
    HttpModule,
    MaterialMod,
    MdInputModule,
    MatListModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSnackBarModule,
    ChartsModule,
    MatGridListModule,
    MatSelectModule,
    MatChipsModule,
    MatRadioModule,
    TJsonViewerModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    MatDialogModule,
    DialogsModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDlrPvrjndKPbJxqLhzcVtLYDXHG6fvaNQ'
    })
  ],
  providers: [
    AngularFireAuth,
    AuthGuard,
    AuthenticationService,
    AuthApiService,
    WindowService,
    DialogsService,
    AuthAPI,
    MyDataService,
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'it', 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
