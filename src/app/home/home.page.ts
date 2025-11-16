import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSpinner,
  LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project.model';
import { HeaderComponent } from '../header/header.component';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonSpinner,
    IonFabButton,
    IonFab,
    IonIcon,
    IonButton,
    IonChip,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonContent,
    HeaderComponent,
    IonCard,
    CommonModule,
  ],
})
export class HomePage {
  public projects$: Observable<Project[]>;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({ add });
  }

  ngOnInit() {
    this.projects$ = this.projectService.getProjects();
  }

  onEditProject(project: Project) {
    console.log('Editar:', project.id);
    if (project.id) {
      this.router.navigate(['/edit', project.id]);
    }
  }

  public async onDeleteProject(project: Project) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Tem certeza que deseja deletar o projeto "${project.nomeProjeto}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Deletar',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Deletando...',
            });
            await loading.present();
            try {
              await this.projectService.deleteProject(project.id);
            } catch (error) {
              console.error('Erro ao deletar:', error);
            }
            await loading.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }

  getStatusColor(
    status: 'Iniciar' | 'Em Andamento' | 'Concluído' | 'Em espera' | 'Cancelado'
  ) {
    switch (status) {
      case 'Iniciar':
        return 'medium';
      case 'Em Andamento':
        return 'primary';
      case 'Em espera':
        return 'warning';
      case 'Concluído':
        return 'success';
      case 'Cancelado':
        return 'danger';
      default:
        return 'medium';
    }
  }
  onClickBtnAdd() {
    console.log('apertei no +');
    this.router.navigate(['/add']);
  }
}
