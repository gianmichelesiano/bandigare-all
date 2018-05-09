import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ActivatedRoute,Router, Routes} from '@angular/router';
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
import { MatGridListModule } from '@angular/material';
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
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';

import { AgmCoreModule } from '@agm/core';
import { AuthenticationService } from './authentication.service';
import { MyMapComponent } from './my-map/my-map.component';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';
import { SearchListComponent } from './search-list/search-list.component';
import { JsonPageComponent } from './json-page/json-page.component';
import { AngularFireDatabase, AngularFireList, AngularFireObject  } from 'angularfire2/database';
import { NetworkVisComponent } from './network-vis/network-vis.component';
import { NetworkComponent } from './network/network.component';
import { CompanyHouseComponent } from './company-house/company-house.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import {  ViewChild, HostListener } from '@angular/core';
import {MdSidenav} from "@angular/material";
import { RicercaComponent } from './ricerca/ricerca.component';
import { MakePaymentComponent } from './payments/make-payment/make-payment.component';


@Component({
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['./home.css']
})


export class Home   {
  data: string = '';
  data1: string = '';
  username = '';

  numUser = 22
  numBVD = 0
  numSmartKYC = 0
  numZefix = 0 
  numTwitter = 0


  constructor(public as:AuthenticationService, public afAuth: AngularFireAuth, db: AngularFireDatabase) {

   }
    setConfirmUnload(on) {
        window.onbeforeunload = (on) ? this.unloadMessage : null;
    }
    unloadMessage() {
        return "You have unsaved changes";
    }
    saveData() {
        this.data1 = this.data;
        this.setConfirmUnload(false);
    }
}


export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard]} ,
  { path: 'company', component: CompanyComponent} ,
  { path: 'login', component: LoginComponent} ,
  { path: 'form-page', component: FormPageComponent} ,
  { path: 'todo', component: FirestoreSampleComponent} ,
  { path: 'database', component: DatabaseComponent} ,
  { path: 'datatable', component: DatatableComponent} ,
  { path: 'doughnut-chart', component: DoughnutChartGSComponent} ,
  { path: 'bvd', component: BvdComponent} ,
  { path: 'smartkyc', component: SmartkycComponent} ,
  { path: 'form-page', component: FormPageComponent} ,
  { path: 'twitter', component: TwitterComponent} ,
  { path: 'zefix', component: ZefixComponent} ,
  { path: 'company-house', component: CompanyHouseComponent} ,
  { path: 'detailsZefix/:chid', component: DetailZefixComponent} ,
  { path: 'pdf', component: PdfComponent} ,
  { path: 'signup', component: SignupComponent} ,
  { path: 'logout', component: LogoutComponent} ,
  { path: 'maps', component: GoogleMapComponent} ,
  { path: 'personal-data', component: PersonalDataComponent} ,
  { path: 'my-map', component: MyMapComponent} ,
  { path: 'verify-mail', component: VerifyMailComponent} ,
  { path: 'search-list', component: SearchListComponent} ,
  { path: 'json-page/:id', component: JsonPageComponent} ,
  { path: 'network-vis', component: NetworkVisComponent} ,
  { path: 'network/:bvdid', component: NetworkComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'ricerca', component: RicercaComponent },
  { path: 'stripe', component: MakePaymentComponent },
  
 
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild('sidenav') sidenav: MdSidenav;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
        if (event.target.innerWidth < 1000) {
            this.sidenav.close();
        }
  }


  gare: AngularFireObject<any>;
  public nome  = "No user"
  title = 'app';
  username = '';
  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth, public as:AuthenticationService, private router: Router) {


    // this.gare = db.object('gare');
    // this.gare.snapshotChanges().subscribe(snapshot => {
    //    let val = snapshot.payload.val()

    //   for (let key in val) {
    //     console.log(key)
    //     console.log(val[key])
    //   }
    //   console.log('fine')
    // });

   }
}
