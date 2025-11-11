import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import {
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
  IonItem,
  IonContent,
  IonList,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  imports: [
    IonButton,
    IonIcon,
    IonList,
    IonContent,
    IonItem,
    IonToolbar,
    IonTitle,
    IonInput,
    IonHeader,
    IonHeader,
    ReactiveFormsModule,
  ],
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (!this.cadastroForm.valid) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cadastrando...',
    });
    await loading.present();

    try {
      const { name, username, email, password } = this.cadastroForm.value;
      const user = await this.userService.register({ email, password });

      await loading.dismiss();

      if (user) {
        await this.presentAlert(
          'Sucesso!',
          'Cadastro realizado. Faça o login para continuar.'
        );
        this.router.navigateByUrl('/login');
      } else {
        await this.presentAlert(
          'Falha',
          'Não foi possível realizar o cadastro. Verifique se o e-mail já está em uso.'
        );
      }
    } catch (e) {
      await loading.dismiss();
      await this.presentAlert('Erro', 'Ocorreu um erro inesperado.');
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
}
