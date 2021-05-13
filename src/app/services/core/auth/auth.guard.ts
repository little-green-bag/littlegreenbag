import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next, state): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map((user) => {
        console.log('user is ', user);
        if (!user || user?.uid !== '27PqJHgiSSZxeJnP5KwVSwPzbjZ2') {
          this.router.navigate(['/no-access']);
        }
        return !!user;
      }),
      tap((loggedIn) => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/no-access']);
        }
      })
    );
  }
}
