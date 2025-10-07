import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonList, IonItem, IonContent, IonHeader, IonToolbar, IonTitle, IonMenu } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonItem,
    IonList,
    IonApp,
    IonRouterOutlet,
    IonMenu
],
})
export class AppComponent {
  constructor() {}
}
