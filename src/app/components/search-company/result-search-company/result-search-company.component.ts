import { Component, OnInit, Input, Inject } from '@angular/core';
import { Company } from 'src/app/services/company/company.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: '../dialog-company/dialog-company-found.html',
  styleUrls: ['../dialog-company/dialog-company-found.css']
})
export class DialogCompanyFoundComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogCompanyFoundComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-result-search-company',
  templateUrl: './result-search-company.component.html',
  styleUrls: ['./result-search-company.component.css']
})
export class ResultSearchCompanyComponent implements OnInit {

  @Input() company: Company;
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCompanyFoundComponent, {
      width: '80%',
      data: {
        name: this.company.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ngOnInit() {
  }
}
