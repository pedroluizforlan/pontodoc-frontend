import { Component, inject, OnInit } from '@angular/core';
import { StatsCardComponent } from '../../../shared/components/stats-card/stats-card.component';
import { HeaderTextComponent } from "../../../shared/components/header-text/header-text.component";
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { CreateCollaboratorDialogComponent } from './create-collaborator-dialog/create-collaborator-dialog.component';
import { CollaboratorsService } from '../../../services/collaborators.service';

import { Collaborator } from '../../../models/collaborator.model';
import { CollaboratorsTableComponent } from "./collaborators-table/collaborators-table.component";

@Component({
  selector: 'app-collaborators',
  imports: [StatsCardComponent, HeaderTextComponent, HlmButtonImports,
    NgIcon, HlmIcon, 
    CreateCollaboratorDialogComponent, CollaboratorsTableComponent],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css',
  providers: [provideIcons({ lucidePlus })]
})
export class CollaboratorsComponent implements OnInit{

  private collaboratorsService = inject(CollaboratorsService);
  collaborators!:Collaborator[];
  isCreateModalOpen = false;

  fake = [
  {
    "title": "Total de Colaboradores", 
    "stats": "5", 
    "data": "8"
  },
  {
    "title": "Ativos", 
    "stats": "3", 
    "data": "5"
  },
  {
    "title": "Pendentes", 
    "stats": "1", 
    "data": "-2"
  },
  {
    "title": "Taxa de Assinatura", 
    "stats": "85%", 
    "data": "12"
  }
];

  async ngOnInit(): Promise<void> {
    this.collaboratorsService.findAll().subscribe(response => {
      this.collaborators = response;
    });
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

}
