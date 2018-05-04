import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  data: string = '';
  data1: string = '';
  username = '';

  numUser = 0
  numBVD = 0
  numSmart = 0
  numTwitter = 0
  numZefix = 0  

  constructor(public afAuth: AngularFireAuth) {
        if (this.afAuth.auth.currentUser != null) {
          this.username = this.afAuth.auth.currentUser.email
        }
        
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


