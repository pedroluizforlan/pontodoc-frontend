import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutDashboard , lucideUpload , lucideFileCheck2 , lucideSend, lucideCircleAlert , lucideUsers , lucideCog , lucideLogOut} from '@ng-icons/lucide';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, RouterLink, RouterLinkActive, NgIcon, HlmIcon ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  providers: [
    provideIcons({ lucideLayoutDashboard , lucideUpload , lucideFileCheck2 , lucideSend , lucideCircleAlert, lucideUsers , lucideCog, lucideLogOut})
  ]
})
export class SideBarComponent {
  @Input() role: 'ADMIN' | 'COLLABORATOR' = 'ADMIN';

  adminMenu = [
    { label: 'Dashboard', icon: 'lucideLayoutDashboard', route: '/admin/dashboard' },
    { label: 'Upload de Documentos', icon: 'lucideUpload', route: '/admin/upload' },
    { label: 'Revisão de Documentos', icon: 'lucideFileCheck2', route: '/admin/review' },
    { label: 'Envio de Documentos', icon: 'lucideSend', route: '/admin/send' },
    { label: 'Gestão de Pendências', icon: 'lucideCircleAlert', route: '/admin/pending' },
    { label: 'Colaboradores', icon: 'lucideUsers', route: '/admin/collaborators' },
  ];

  collaboratorMenu = [
     { label: 'Meus Documentos', icon: 'file-check', route: '/collaborators/documents' },
  ];

  get menuItems() {
    return this.role === 'ADMIN' ? this.adminMenu : this.collaboratorMenu;
  }

  logout() {
    console.log('Logout logic here');
  }
}
