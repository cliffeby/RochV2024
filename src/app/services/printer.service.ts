import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  isPrinting = false;
  public lineUpSubject = new BehaviorSubject(null);

  constructor(private router: Router) {}

  printDocument(documentName: string) {
    this.isPrinting = true;
    this.router.navigate([
      '/',
      {
        outlets: {
          'print': ['print', documentName],
        },
      },
    ]);
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null } }]);
    });
  }
}
