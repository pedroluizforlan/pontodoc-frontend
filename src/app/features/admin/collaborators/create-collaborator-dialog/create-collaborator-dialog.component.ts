import { Component, EventEmitter, inject, Input, Output, viewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { BrnDialogImports, BrnDialog } from '@spartan-ng/brain/dialog';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { CommonModule } from '@angular/common';
import { CollaboratorsService } from '../../../../services/collaborators.service';
import { Collaborator } from '../../../../models/collaborator.model';


@Component({
  selector: 'app-create-collaborator-dialog',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrnDialogImports,
    HlmDialogImports,
    HlmLabelImports,
    HlmInputImports,
    HlmButtonImports,
    HlmSelectImports,
    BrnSelectImports,
    HlmCheckboxImports,
    HlmSpinnerImports,
  ],
  templateUrl: './create-collaborator-dialog.component.html',
  styleUrl: './create-collaborator-dialog.component.css',
})
export class CreateCollaboratorDialogComponent implements OnChanges {
  private dialog = viewChild(BrnDialog);

  @Input() isOpen = false;
  @Input() isEditMode = false;
  @Input() initialData: Collaborator | null = null;
  @Input() title = 'Cadastrar Novo Colaborador';

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() collaboratorSaved = new EventEmitter<Collaborator>();

  private _fb = inject(FormBuilder);
  isLoading = false;

  private cpfValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11 ? null : { cpfInvalid: true };
  };

  private phoneValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11 ? null : { phoneInvalid: true };
  };

  private cepValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 8 ? null : { cepInvalid: true };
  };

  private passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    if (!password || !passwordConfirm) return null;
    if (!password.value && !passwordConfirm.value) return null;

    return password.value === passwordConfirm.value ? null : { passwordMismatch: true };
  };

  department = ["FINANCEIRO", "DESENVOLVIMENTO", "CRIAÇÃO", "PLANEJAMENTO E MÍDIA", "ATENDIMENTO", "TRÁFEGO", "COMERCIAL", "SITES", "CUSTOMER EXPIRENCE", "RECURSOS HUMANOS"]

  form = this._fb.group({
    person: this._fb.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      cpf: ['', [Validators.required, this.cpfValidator]],
      address: ['', Validators.required],
      cep: ['', [Validators.required, this.cepValidator]],
      gender: ['', Validators.required],
      number: ['', [Validators.required, this.phoneValidator]],
    }),
    user: this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      passwordConfirm: [''],
      useType: ['EMPLOYEE'],
      verifiedEmail: [false],
    }, { validators: this.passwordMatchValidator }),
    employee: this._fb.group({
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      hiringDate: [''],
      managerId: [null as number | null],
      leadership: [false],
    }),
  });

  ngOnInit() {
    this.updatePasswordValidators();
  }

  constructor(
    private collaboratorService: CollaboratorsService
  ){}

  private updatePasswordValidators(): void {
    const passwordControl = this.form.get('user.password');
    const passwordConfirmControl = this.form.get('user.passwordConfirm');

    if (this.isEditMode) {
      passwordControl?.setValidators([]);
      passwordConfirmControl?.setValidators([]);
    } else {
      passwordControl?.setValidators([Validators.required]);
      passwordConfirmControl?.setValidators([Validators.required]);
    }

    passwordControl?.updateValueAndValidity({ emitEvent: false });
    passwordConfirmControl?.updateValueAndValidity({ emitEvent: false });
    this.form.get('user')?.updateValueAndValidity({ emitEvent: false });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.dialog()?.open();
      } else {
        this.dialog()?.close();
      }
    }
    if (changes['isEditMode']) {
      this.updatePasswordValidators();
    }
    if (changes['initialData'] && this.isEditMode && this.initialData) {
      this.form.patchValue({
        person: this.initialData.person,
        user: {
          email: this.initialData.user.email,
          password: '',
          passwordConfirm: '',
          useType: this.initialData.user.useType,
          verifiedEmail: this.initialData.user.verifiedEmail
        },
        employee: {
          jobTitle: this.initialData.employee.jobTitle,
          department: this.initialData.employee.department,
          hiringDate: this.initialData.employee.hiringDate || '',
          managerId: this.initialData.employee.managerId,
          leadership: this.initialData.employee.leadership
        }
      });
    }
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
    if (this.form.valid) {
      const payload = this.form.value;
      const collaborator = this.createCollaborator(payload);

      this.isLoading = true;

      if (this.isEditMode) {
        collaborator.id = this.initialData?.id;
        this.collaboratorSaved.emit(collaborator);
        this.close();
        this.isLoading = false;
      } else {
        this.collaboratorService.create(collaborator).subscribe({
          next: (response) => {
            console.log('Colaborador criado com sucesso:', response);
            this.close();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Erro ao criar colaborador:', error);
            this.isLoading = false;
          }
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  close() {
    this.isOpenChange.emit(false);
    this.dialog()?.close();
  }
}
