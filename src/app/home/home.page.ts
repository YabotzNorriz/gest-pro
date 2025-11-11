import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonButton,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonFabButton,
    IonFab,
    IonIcon,
    IonButton,
    IonChip,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonContent,
    HeaderComponent,
    IonCard,
  ],
})
export class HomePage {
  constructor(private router: Router) {
    addIcons({ add });
  }
}
