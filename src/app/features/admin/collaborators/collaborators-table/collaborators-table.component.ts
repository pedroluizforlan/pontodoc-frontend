import { Component, inject, Input } from '@angular/core';
import { Collaborator } from '../../../../models/collaborator.model';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash, lucideArrowRightFromLine } from '@ng-icons/lucide';
import { CollaboratorsService } from '../../../../services/collaborators.service';
import { CommonModule } from '@angular/common';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { DeleteConfirmationDialogComponent } from '../../../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CreateCollaboratorDialogComponent } from '../create-collaborator-dialog/create-collaborator-dialog.component';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

@Component({
  selector: 'app-collaborators-table',
  imports: [NgIcon, HlmIcon,
    CommonModule,
    HlmButtonImports,
    HlmTableImports,
    HlmBadgeImports,
    HlmSpinnerImports,
    DeleteConfirmationDialogComponent,
    CreateCollaboratorDialogComponent,
  ],
  templateUrl: './collaborators-table.component.html',
  styleUrl: './collaborators-table.component.css',
  providers: [
    provideIcons({lucideTrash,lucideArrowRightFromLine})
  ]
})
export class CollaboratorsTableComponent {
  @Input() collaborators: Collaborator[] = [];

  private collaboratorService = inject(CollaboratorsService);

  selectedCollaborator: Collaborator | null = null;

  isEditModalOpen = false;
  isDeleteModalOpen = false;
  isLoading = false;

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
      this.isLoading = true;
      this.collaboratorService.delete(this.selectedCollaborator.id).subscribe({
        next: () => {
          console.log(`Colaborador ${this.selectedCollaborator!.id} deletado com sucesso.`);
          this.isDeleteModalOpen = false;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao deletar colaborador:', err);
          this.isDeleteModalOpen = false;
          this.isLoading = false;
        }
      });
    }
  }

  saveEdit(updatedCollaborator: Collaborator) {
     if (updatedCollaborator.id) {
        this.isLoading = true;
        this.collaboratorService.update(updatedCollaborator.id, updatedCollaborator).subscribe({
            next: () => {
                console.log(`Colaborador ${updatedCollaborator.id} atualizado.`);
                this.isEditModalOpen = false;
                this.isLoading = false;
            },
            error: (err) => {
              console.error('Erro ao atualizar:', err);
              this.isLoading = false;
            }
        });
     }
  }
}
