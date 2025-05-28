import { Component, inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SlyfoxUiButtonComponent, SlyfoxUiIconComponent } from 'slyfox-ui';
import { IInformationDialogData } from '@interfaces/dialogs.interfaces';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-information-dialog',
  imports: [CommonModule, SlyfoxUiIconComponent, SlyfoxUiButtonComponent, TranslateModule],
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss']
})
export class InformationDialogComponent implements OnInit {

  protected data = inject<IInformationDialogData | null>(DIALOG_DATA)
  protected dialogRef = inject(DialogRef);

  constructor() { }

  ngOnInit(): void { }
}
