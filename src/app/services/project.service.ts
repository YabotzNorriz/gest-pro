import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  public async addProject(
    projectData: Omit<Project, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
  ) {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado!');
    }

    const projectsCollection = collection(this.firestore, 'projects');

    const dataToSave = {
      ...projectData,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(projectsCollection, dataToSave);
      return docRef;
    } catch (e) {
      console.error('Erro ao salvar projeto: ', e);
      return null;
    }
  }

  public getProjects(): Observable<Project[]> {
    const projectsCollection = collection(this.firestore, 'projects');
    const project = query(projectsCollection, orderBy('createdAt', 'desc'));
    return collectionData(project, { idField: 'id' }) as Observable<Project[]>;
  }

  public getProjectById(projectId: string): Observable<Project> {
    const projectDocRef = doc(this.firestore, `projects/${projectId}`);
    return docData(projectDocRef, { idField: 'id' }) as Observable<Project>;
  }

  public async updateProject(projectId: string, projectData: Partial<Project>) {
    const projectDocRef = doc(this.firestore, `projects/${projectId}`);
    const dataToUpdate = {
      ...projectData,
      updatedAt: serverTimestamp(),
    };

    try {
      await updateDoc(projectDocRef, dataToUpdate);
      console.log('Projeto atualizado com ID: ', projectId);
    } catch (e) {
      console.error('Erro ao atualizar projeto: ', e);
    }
  }

  public deleteProject(projectId: string) {
    const projectDocRef = doc(this.firestore, `projects/${projectId}`);
    return deleteDoc(projectDocRef);
  }
}
