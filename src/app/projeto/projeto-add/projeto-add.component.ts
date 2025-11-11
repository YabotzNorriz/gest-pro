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
  selector: 'app-projeto-add',
  templateUrl: './projeto-add.component.html',
  styleUrls: ['./projeto-add.component.scss'],
  imports: [
    IonButton,
    IonTextarea,
    IonInput,
    IonLabel,
    HeaderComponent,
    IonContent,
    IonItem,
    IonSelectOption,
    IonSelect,
    IonList,
  ],
})
export class ProjetoAddComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
