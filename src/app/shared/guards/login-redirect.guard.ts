import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { AuthService } from "@services/auth.service";
import { Observable } from "rxjs";

export const loginRedirectGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> | boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(!authService.sessionIsActive()) return true;

  return router.createUrlTree(['/administration'])
}
