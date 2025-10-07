import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelectOption,
  IonButton,
  IonSelect,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'app-projeto-edit',
  templateUrl: './projeto-edit.component.html',
  styleUrls: ['./projeto-edit.component.scss'],
  imports: [
    IonButton,
    IonTextarea,
    IonInput,
    IonLabel,
    IonItem,
    HeaderComponent,
    IonContent,
    IonList,
    IonSelect,
    IonSelectOption,
  ],
})
export class ProjetoEditComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
