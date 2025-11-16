import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { key, mail } from 'ionicons/icons';
import { UserService } from '../services/user.service';

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

  public async onLogin() {
    console.log('Tentando logar com', this.loginForm.value, this.loginForm.valid);
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

  public async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  public onClickBtnCadastro() {
    this.router.navigate(['/cadastro']);
  }
  //TODO: Podemos implementar uma recuperação de senha no banco de dados (necessário colocar no HTML)
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
