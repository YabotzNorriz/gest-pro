import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, Firestore, serverTimestamp } from '@angular/fire/firestore';
import { Project } from 'src/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async addProject(
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
      console.log('Projeto salvo com ID: ', docRef.id);
      return docRef;
    } catch (e) {
      console.error('Erro ao salvar projeto: ', e);
      return null;
    }
  }

}
