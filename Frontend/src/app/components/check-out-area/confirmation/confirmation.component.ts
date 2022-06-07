import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReceiptsService } from 'src/app/services/receipts.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>, private router: Router,
    private receiptsService: ReceiptsService,
  ) { }

  public goHome() {
    this.router.navigateByUrl("home");
    this.dialogRef.close();
  }
  
  public downloadReceipt() {
    // subscribing to observer to get receipt txt from server:
    this.receiptsService.downloadReceipt().subscribe((response: any) => {
      // setting Blob type from response:
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      // saveAs is a function from file-saver package, using Blob type as data:
      saveAs(blob, 'receipt.txt');
      })
    this.dialogRef.close();
  }
    

}
