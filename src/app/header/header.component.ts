// src/app/header/header.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import {
  IonButtons,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonSegment, IonSegmentButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Status } from 'src/models/enums';

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
export class HeaderComponent {
  @Output() filterChange = new EventEmitter<Status>();
  status = Status;
  selectedStatus: Status = Status.Iniciar;

  onSegmentChange(event: any) {
    this.selectedStatus = event.detail.value as Status;
    this.filterChange.emit(this.selectedStatus);
  }
}