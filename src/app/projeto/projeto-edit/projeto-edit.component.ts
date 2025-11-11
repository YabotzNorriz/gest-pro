import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  IonSpinner,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/header/header.component';
import { ProjectService } from 'src/app/services/project.service';
import {
  AlertController,
  LoadingController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { take } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projeto-edit',
  templateUrl: './projeto-edit.component.html',
  styleUrls: ['./projeto-edit.component.scss'],
  imports: [
    IonSpinner,
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
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class ProjetoEditComponent implements OnInit {
  projectForm!: FormGroup;
  projectId: string | null = null;
  isLoading = true;
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // 1. Cria o formulário (igual ao 'add')
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

    this.projectId = this.route.snapshot.paramMap.get('id');

    if (this.projectId) {
      this.loadProjectData(this.projectId);
    } else {
      this.presentAlert('Erro', 'ID do projeto não fornecido.');
      this.navCtrl.back();
    }
  }

  loadProjectData(id: string) {
    this.isLoading = true;
    this.projectService
      .getProjectById(id)
      .pipe(take(1)) // Pega o primeiro valor e encerra a inscrição
      .subscribe({
        next: (data) => {
          if (!data) {
            this.presentAlert('Erro', 'Projeto não encontrado.');
            this.navCtrl.back();
            return;
          }

          const tagsAsString = Array.isArray(data.tags)
            ? data.tags.join(', ')
            : '';

          const formData = {
            ...data,
            tags: tagsAsString,
          };

          this.projectForm.patchValue(formData);
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.presentAlert('Erro', 'Não foi possível carregar o projeto.');
          this.isLoading = false;
          this.navCtrl.back();
        },
      });
  }

  async onUpdate() {
    if (!this.projectForm.valid || !this.projectId) {
      this.presentAlert(
        'Erro',
        'Por favor, preencha todos os campos obrigatórios.'
      );
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Atualizando...',
    });
    await loading.present();

    try {
      const formValue = this.projectForm.value;
      const tagsArray = formValue.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const projectData = { ...formValue, tags: tagsArray };
      await this.projectService.updateProject(this.projectId, projectData);
      await loading.dismiss();
      await this.presentAlert('Sucesso', 'Projeto atualizado com sucesso.');
      this.navCtrl.back();
    } catch (e) {
      await loading.dismiss();
      await this.presentAlert('Erro', 'Ocorreu um erro inesperado.');
      console.error(e);
    }
  }

  async onDeleteConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Você tem certeza que deseja excluir este projeto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.deleteProject(); // Chama a função de exclusão
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteProject() {
    if (!this.projectId) return;

    const loading = await this.loadingController.create({
      message: 'Excluindo...',
    });
    await loading.present();

    try {
      await this.projectService.deleteProject(this.projectId);
      await loading.dismiss();
      await this.presentAlert('Sucesso', 'Projeto excluído.');
      this.router.navigateByUrl('/home'); // Volta para a home
    } catch (e) {
      await loading.dismiss();
      this.presentAlert('Erro', 'Falha ao excluir o projeto.');
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

  onClickBtnCancelar() {
    this.navCtrl.back();
  }
}
