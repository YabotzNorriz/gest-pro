import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon,
  IonInput, IonItem, IonLabel, IonMenuButton, IonText, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { take } from 'rxjs';
import { UserData } from 'src/models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.scss'],
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonAvatar, IonButton,
    IonIcon, IonText, IonLabel, IonInput, IonItem, IonButtons, IonMenuButton
  ],
})
export class ConfiguracaoComponent {
    userData: UserData = {
    uid: null,
    email: null,
    photoURL: null,
    displayName: null,
  };
  userPhotoUrl: SafeUrl | string = 'assets/avatar-default.png';
  selectedFile: File | null = null;
  isUploading = false;
  uploadError: string | null = null;
  userEmail: string | null = null;

  // Password change state
  wantsToChangePassword = false;
  currentPassword = '';
  currentPasswordChecked = false;
  isCheckingCurrentPassword = false;
  currentPasswordError: string | null = null;

  newPassword = '';
  confirmPassword = '';
  passwordError: string | null = null;
  passwordSuccess: string | null = null;
  isChangingPassword = false;

  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUserData$().pipe(take(1)).subscribe(data => {
      this.userData = data;
      this.userPhotoUrl = data.photoURL ? data.photoURL : 'assets/avatar-default.png';
    });
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userPhotoUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async onCheckCurrentPassword() {
    this.currentPasswordError = null;
    this.isCheckingCurrentPassword = true;
    this.currentPasswordChecked = false;
    try {
      await this.userService.reauthenticate(this.userEmail!, this.currentPassword);
      this.currentPasswordChecked = true;
    } catch {
      this.currentPasswordError = 'Senha atual incorreta.';
    } finally {
      this.isCheckingCurrentPassword = false;
    }
  }

  async onSavePhoto() {
    if (!this.selectedFile) return;
    this.isUploading = true;
    this.uploadError = null;
    try {
      const url = await this.userService.uploadUserPhoto(this.selectedFile);
      if (url) {
        this.userPhotoUrl = url;
        this.selectedFile = null;
      }
    } catch {
      this.uploadError = 'Erro ao enviar foto.';
    } finally {
      this.isUploading = false;
    }
  }

  async onChangePassword() {
    this.passwordError = null;
    this.passwordSuccess = null;
    if (!this.newPassword || !this.confirmPassword) {
      this.passwordError = 'Preencha ambos os campos.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'As senhas não coincidem.';
      return;
    }
    if (this.newPassword.length < 6) {
      this.passwordError = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }
    this.isChangingPassword = true;
    try {
      await this.userService.changePassword(this.newPassword);
      this.passwordSuccess = 'Senha alterada com sucesso! Você será desconectado para fazer login novamente.';
      this.newPassword = '';
      this.confirmPassword = '';
      this.wantsToChangePassword = false;
      this.currentPassword = '';
      this.currentPasswordChecked = false;

      // Wait 2 seconds, then logout and redirect to login
      setTimeout(async () => {
        await this.userService.logout();
        this.router.navigate(['/login']);
      }, 2000);
    } catch (e: any) {
      this.passwordError = e?.message || 'Erro ao alterar senha.';
    } finally {
      this.isChangingPassword = false;
    }
  }
}