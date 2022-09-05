import { Injectable, isDevMode } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import mixpanel from 'mixpanel-browser';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  constructor(private _authService: AuthService) {
  }

  signIn() {
    this.init();
    mixpanel.track(
      "Log In"
    );
  }

  track(action: string) {
    this.init();
    mixpanel.track(
      action
    );
  }
  private init(): void {
    mixpanel.init('aecb078dc0f63e943bb67b82ccf4c535');
    if (this._authService.isSignedIn()) {
      mixpanel.identify(this._authService.currentUser.UserName);
    }
    if (this._authService.currentUser == null) {

    }
  }
}

