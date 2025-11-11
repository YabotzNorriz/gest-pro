import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
import { ProjectService } from 'src/app/services/project.service';
import { AlertController, LoadingController } from '@ionic/angular';

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
    ReactiveFormsModule,
  ],
})
export class ProjetoAddComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.projectForm = this.fb.group({
      numProjeto: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      nomeProjeto: ['', [Validators.required]],
      areas: ['', [Validators.required]],
      responsavel: ['', [Validators.required]],
      escopo: ['', [Validators.required]],
      status: ['iniciar', [Validators.required]],
      tags: [''],
    });
  }

  async onSubmit() {
    if (!this.projectForm.valid) {
      this.presentAlert(
        'Erro',
        'Por favor, preencha todos os campos obrigatórios.'
      );
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Salvando...',
    });
    await loading.present();

    try {
      const formValue = this.projectForm.value;
      const tagsArray = formValue.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const projectData = { ...formValue, tags: tagsArray };

      const result = await this.projectService.addProject(projectData);

      await loading.dismiss();

      if (result) {
        await this.presentAlert('Sucesso', 'Projeto salvo com sucesso.');
        this.projectForm.reset();
        this.projectForm.patchValue({
          status: 'iniciar',
          tags: '',
        });
        this.router.navigateByUrl('/home');
      } else {
        await this.presentAlert('Falha', 'Não foi possível salvar o projeto.');
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
