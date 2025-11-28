import { Component, EventEmitter, Input, Output, viewChild, OnChanges, SimpleChanges } from '@angular/core';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { BrnDialog } from '@spartan-ng/brain/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  imports: [
    BrnDialogImports,
    HlmDialogImports,
    HlmButtonImports,
  ],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.css'
})
export class DeleteConfirmationDialogComponent implements OnChanges {
  private dialog = viewChild(BrnDialog);

  @Input() title = 'Confirmar Exclusão';
  @Input() message = 'Tem certeza que deseja continuar?';
  @Input() isOpen = false;

  @Output() confirmAction = new EventEmitter<void>();
  @Output() isOpenChange = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && this.isOpen) {
      this.dialog()?.open();
    } else if (changes['isOpen'] && !this.isOpen) {
      this.dialog()?.close();
    }
  }

  onConfirm() {
    this.confirmAction.emit();
  }

  close() {
    this.isOpenChange.emit(false);
    this.dialog()?.close();
  }
}
