import { Component, inject, Input } from '@angular/core';
import { Collaborator } from '../../../../models/collaborator.model';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash, lucideBed } from '@ng-icons/lucide';
import { CollaboratorsService } from '../../../../services/collaborators.service';
import { CommonModule } from '@angular/common';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmButtonImports } from '@spartan-ng/helm/button';
@Component({
  selector: 'app-collaborators-table',
  imports: [NgIcon, HlmIcon,
    CommonModule,
    HlmButtonImports,
    HlmTableImports,
    // HlmTbodyComponent,
    // HlmTdComponent,
    // HlmThComponent,
    // HlmTheadComponent,
    // HlmTrComponent,
  ],
  templateUrl: './collaborators-table.component.html',
  styleUrl: './collaborators-table.component.css',
  providers: [provideIcons({lucideTrash,lucideBed})]
})
export class CollaboratorsTableComponent {
  @Input() collaborators: Collaborator[] = [];
  
  private collaboratorService = inject(CollaboratorsService);

  // Armazena o colaborador sendo editado/deletado
  selectedCollaborator: Collaborator | null = null;
  
  // Propriedades para controle dos modais
  isEditModalOpen = false;
  isDeleteModalOpen = false;

  openEditModal(collaborator: Collaborator) {
    this.selectedCollaborator = collaborator;
    this.isEditModalOpen = true;
  }
  
  openDeleteModal(collaborator: Collaborator) {
    this.selectedCollaborator = collaborator;
    this.isDeleteModalOpen = true;
  }


  confirmDelete() {
    if (this.selectedCollaborator && this.selectedCollaborator.id) {
      this.collaboratorService.delete(this.selectedCollaborator.id).subscribe({
        next: () => {
          console.log(`Colaborador ${this.selectedCollaborator!.id} deletado com sucesso.`);
          this.isDeleteModalOpen = false;
        },
        error: (err) => {
          console.error('Erro ao deletar colaborador:', err);
          this.isDeleteModalOpen = false;
        }
      });
    }
  }
  
  saveEdit(updatedCollaborator: Collaborator) {
     if (updatedCollaborator.id) {
        this.collaboratorService.update(updatedCollaborator.id, updatedCollaborator).subscribe({
            next: () => {
                console.log(`Colaborador ${updatedCollaborator.id} atualizado.`);
                this.isEditModalOpen = false;
            },
            error: (err) => console.error('Erro ao atualizar:', err)
        });
     }
  }
}
