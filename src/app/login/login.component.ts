import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonIcon,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { happy, key, mail, people } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    IonButton,
    IonInput,
    IonItem,
    IonList,
    IonToolbar,
    IonTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonButton,
    ReactiveFormsModule,
  ],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor() {
    addIcons({ mail, key, people, happy });
  }

  ngOnInit() {}

  onLogin() {
    throw new Error('Método não implementado');
  }
}
