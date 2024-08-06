import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  readonly dialog = inject(MatDialog);

  launchDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    return dialogRef;
  }
}
