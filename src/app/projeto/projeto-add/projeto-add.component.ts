import { TitleCasePipe } from '@angular/common';
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
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  LoadingController
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/header/header.component';
import { ProjectService } from 'src/app/services/project.service';
import { Status } from 'src/models/enums';

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
    TitleCasePipe
  ],
})
export class ProjetoAddComponent implements OnInit {
  projectForm!: FormGroup;
  public statusOptions = Object.values(Status);

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
      status: [Status.Iniciar, [Validators.required]],
      tags: [''],
    });
  }

  public async onSubmit() {
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

  public async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  onClickBtnCancelar() {
    this.router.navigate(['/home']);
  }
}
