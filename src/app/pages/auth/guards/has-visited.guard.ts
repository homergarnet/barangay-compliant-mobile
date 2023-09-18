import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class HasVisitedGuard implements CanActivate {

  constructor(

    private router: Router,
    private storage: Storage,

  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.storage.create(); // Ensure storage is created
    const hasVisited = this.storage.get('hasVisited');


    if (!hasVisited) {


      // User hasn't visited, allow access to the page and set the flag
      this.storage.set('hasVisited', true);
      return true;
    }

    else {

      this.router.navigate(['/pages/auth/compliant-sign-in']);

    }

    return false;

  }
}
