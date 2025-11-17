
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  MenuController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, documentsOutline, home, power, send, settings } from 'ionicons/icons';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonIcon,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonItem,
    IonList,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonLabel,
  ],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private menuCtrl: MenuController) {
    addIcons({ arrowBack, home, settings, power, send, documentsOutline });
  }

  async onLogout() {
    await this.userService.logout();
    await this.menuCtrl.close();
    this.router.navigate(['/login']);
  }

  goHome() {
    this.menuCtrl.close();
    this.router.navigate(['/home']);
  }

  goSettings() {
    this.menuCtrl.close();
    this.router.navigate(['/configuracao']);
  }
  
}
