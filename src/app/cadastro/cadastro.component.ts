import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import {
  IonInput,
  IonList,
  IonItem,
  IonContent,
  IonIcon,
  IonItemSliding,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mail, key, people, happy } from 'ionicons/icons';
import { User } from 'src/models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  imports: [
    IonButton,
    IonIcon,
    IonContent,
    IonItem,
    IonList,
    IonInput,
    IonIcon,
    ReactiveFormsModule,
  ],
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  user!: User;
  cadastroForm!: FormGroup;
  checkEmail!: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    addIcons({ mail, key, people, happy });
  }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    if (this.cadastroForm.valid) {
      const newUser = this.cadastroForm.value;
      const email = this.cadastroForm.get('email')?.value;
      this.userService.checkEmail(email).subscribe((exists) => {
        this.checkEmail = exists;
        console.log('Alterado o email: ' + this.checkEmail);

        if (!this.checkEmail) {
          console.log('Alterado em baixo ' + this.checkEmail);
          this.userService.createUser(newUser).subscribe(() => {
            alert('Cadastro realizado com sucesso!');
            this.router.navigate(['login']);
          });
        } else {
          alert('Email já cadastrado!');
        }
      });
    } else {
      console.log(this.cadastroForm);
    }
  }
}
