import { Component, OnInit } from '@angular/core';
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonHeader,
  IonButtons,
  IonMenuButton,
  IonMenu as IonMenu,
  IonItem, IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonLabel, IonSegmentButton, IonSegment,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
