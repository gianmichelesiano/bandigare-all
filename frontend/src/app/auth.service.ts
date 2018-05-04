import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthGuard implements CanActivate {
  username :string
  constructor(private afAuth: AngularFireAuth, private router: Router) { 
    
  }

  canActivate(): Observable<boolean> {
    console.log("canActivate")
    console.log(this.afAuth.authState)
    return this.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      });
  }
}