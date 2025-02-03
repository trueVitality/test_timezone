import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-dialog',
  imports: [
    MatButtonModule, 
    MatListModule,
    MatButtonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose
  ],
  templateUrl: 'add-dialog.component.html',
  styleUrl: './add-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDialogComponent {

  readonly dialogRef = inject(MatDialogRef<AddDialogComponent>);
  readonly timezones = inject<string[]>(MAT_DIALOG_DATA);
}
