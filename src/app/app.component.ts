import { Component } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, documentsOutline, home, power, send, settings } from 'ionicons/icons';

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
    addIcons({ arrowBack, home, settings, power, send, documentsOutline });
  }
}
