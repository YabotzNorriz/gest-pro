import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonList,
  IonItem,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenu,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, home, power, settings } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
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
  ],
})
export class AppComponent {
  constructor() {
    addIcons({ arrowBack, home, settings, power });
  }
}
