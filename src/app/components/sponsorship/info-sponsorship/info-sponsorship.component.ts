import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user/user.service';

export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-sponsorship-modal',
  template: '<h1 mat-dialog-title>Parrainer vos amis</h1>' +
    '<div mat-dialog-content>' +
    '<p>Envoyer une invitation par email</p>' +
    '<mat-form-field>' +
    '<input matInput type="email" [(ngModel)]="data.email" email>' +
    '</mat-form-field>' +
    '</div>' +
    '<div mat-dialog-actions>' +
    '<button mat-button (click)="onNoClick()">Annuler</button>' +
    '<button mat-button [mat-dialog-close]="data" cdkFocusInitial>Envoyer</button>' +
    '</div>',
})
export class SponsorModalComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoSponsorshipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-info-sponsorship',
  templateUrl: './info-sponsorship.component.html',
  styleUrls: ['./info-sponsorship.component.css']
})
export class InfoSponsorshipComponent implements OnInit {

  @Input() user: User;

  constructor(public dialog: MatDialog,
    private userService: UserService) { }

  ngOnInit() {
  }

  sendCodeToFriends() {
    const dialogRef = this.dialog.open(SponsorModalComponent, {
      width: '350px',
      data: { email: '' }
    });
    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result.email.length > 0) {
        this.userService.sendInvitation(result.email).subscribe();
      }
    });
  }

}
