import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { Status } from 'src/models/enums';
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
export class HomePage implements OnInit {
  public projects$: Observable<Project[]>;
  public allProjects: Project[] = [];
  public filteredProjects: Project[] = [];
  public selectedStatus: Status = Status.Iniciar;


  constructor(
    private router: Router,
    private projectService: ProjectService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({ add });
  }

/**
 * Lifecycle hook that is called after Angular has fully initialized the component.
 * At this point all the component's input bindings have been resolved and it is safe to access them.
 * In this case, we subscribe to the projects observable returned by the project service.
 */
  ngOnInit() {
    this.projects$ = this.projectService.getProjects();
    this.projects$.subscribe(projects => {
      this.allProjects = projects;
      this.applyFilter();
    });
  }
  onFilterChange(status: Status) {
    this.selectedStatus = status;
    console.log('Filtro alterado no HomePage:', this.selectedStatus);
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedStatus) {
      this.filteredProjects = this.allProjects.filter(
        p => p.status === this.selectedStatus
      );
    } else {
      this.filteredProjects = this.allProjects;
    }
  }
  onEditProject(project: Project) {
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

  getStatusColor(status: Status) {
    switch (status) {
      case Status.Iniciar:
        return 'medium';
      case Status.Andamento:
        return 'primary';
      case Status.EmEspera:
        return 'warning';
      case Status.Concluido:
        return 'success';
      case Status.Cancelado:
        return 'danger';
      default:
        return 'medium';
    }
  }
  onClickBtnAdd() {
    this.router.navigate(['/add']);
  }
}
