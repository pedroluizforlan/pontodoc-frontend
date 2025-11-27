import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucideSave } from '@ng-icons/lucide';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { CollaboratorsService } from '../../../../services/collaborators.service';
import { Collaborator, Employee, Person, User } from '../../../../models/collaborator.model';


@Component({
  selector: 'app-create-collaborator-dialog',
  imports: [
    ReactiveFormsModule,
    NgIcon, HlmIcon,
    BrnDialogImports,
    HlmDialogImports,
    HlmLabelImports, 
    HlmInputImports, 
    HlmButtonImports,
    HlmSelectImports,
    BrnSelectImports,
    HlmCheckboxImports
  ],
  templateUrl: './create-collaborator-dialog.component.html',
  styleUrl: './create-collaborator-dialog.component.css',
  providers: [provideIcons({ lucidePlus, lucideSave })]
})
export class CreateCollaboratorDialogComponent {
private _fb = inject(FormBuilder);

  department = ["FINANCEIRO", "DESENVOLVIMENTO", "CRIAÇÃO", "PLANEJAMENTO E MÍDIA", "ATENDIMENTO", "TRÁFEGO", "COMERCIAL", "SITES", "CUSTOMER EXPIRENCE", "RECURSOS HUMANOS"]

  // Espelha exatamente a estrutura do seu JSON
  form = this._fb.group({
    person: this._fb.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      address: ['', Validators.required],
      cep: ['', Validators.required],
      gender: ['Masculino', Validators.required], // Idealmente um Select
      number: ['', Validators.required],
    }),
    user: this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['Mudar123!', Validators.required], // Senha padrão ou gerada
      useType: ['EMPLOYEE'], // Fixo
      verifiedEmail: [false], // Fixo
    }),
    employee: this._fb.group({
      jobTitle: ['', Validators.required],
      department: ['', Validators.required], // Idealmente um Select
      hiringDate: [],
      managerId: [null],
      leadership: [false],
    }),
  });

  constructor(
    private collaboratorService: CollaboratorsService
  ){

  }


private createCollaborator(payload: any): Collaborator {
  
  const collaborator: Collaborator = {
    person: {
      name: payload.person?.name, 
      birthday: payload.person?.birthday,
      cpf: payload.person?.cpf,
      address: payload.person?.address,
      cep: payload.person?.cep,
      gender: payload.person?.gender,
      number: payload.person?.number
    },
    user: {
      email: payload.user?.email,  
      password: payload.user?.password,
      useType: payload.user?.useType,
      verifiedEmail: payload.user?.verifiedEmail
    },
    employee: {
      jobTitle: payload.employee?.jobTitle,
      department: payload.employee?.department,
      hiringDate: payload.employee?.hiringDate,
      managerId: payload.employee?.managerId,
      leadership: payload.employee?.leadership
    }
  };

  return collaborator;
}


  onSubmit() {
    console.log("ta batendo")
    if (this.form.valid) {
      const payload = this.form.value;

      const collaborator = this.createCollaborator(payload);
      this.collaboratorService.create(collaborator).subscribe({
        next: (response) => {
          console.log('Colaborador criado com sucesso:', response);
        },
        error: (error) => {
          console.error('Erro ao criar colaborador:', error);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
