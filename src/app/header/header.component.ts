import { Component, OnInit } from '@angular/core';
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonHeader,
  IonButtons,
  IonMenuButton,
  IonMenu as IonMenu,
  IonItem,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
  ],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
