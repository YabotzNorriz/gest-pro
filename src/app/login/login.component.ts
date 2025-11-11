import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({ mail, key });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Entrando...',
    });
    await loading.present();

    try {
      const { email, password } = this.loginForm.value;
      const user = await this.userService.login({ email, password });

      await loading.dismiss();

      if (user) {
        this.router.navigateByUrl('/home');
      } else {
        await this.presentAlert(
          'Falha no Login',
          'E-mail ou senha inválidos. Por favor, tente novamente.'
        );
      }
    } catch (e) {
      await loading.dismiss();
      await this.presentAlert(
        'Erro',
        'Ocorreu um erro inesperado. Verifique sua conexão.'
      );
      console.error(e);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  //TODO: Podemos implementar uma recuperação de senha no banco de dados
  // async onForgotPassword() {
  //   const alert = await this.alertController.create({
  //     header: 'Recuperar Senha',
  //     message: 'Digite seu e-mail para enviarmos um link de recuperação.',
  //     inputs: [
  //       {
  //         name: 'email',
  //         type: 'email',
  //         placeholder: 'seu@email.com'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Enviar',
  //         handler: (data) => {
  //           if (data.email) {
  //             console.log('Enviar link de recuperação para:', data.email);
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
}
