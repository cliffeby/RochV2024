import { Component, OnInit } from '@angular/core';
import { PrinterService } from 'src/app/services/printer.service';

@Component({
  selector: 'app-scorecards-mat-print',
  templateUrl: './scorecards-mat-print.component.html',
  styleUrls: ['./scorecards-mat-print.component.css'],
})
export class ScorecardsMatPrintComponent implements OnInit {
  constructor(public _printerService: PrinterService) {}
  scLineUps: any[];
  ngOnInit(): void {
    this._printerService.lineUpSubject.subscribe((value) => {
      this.scLineUps = value;
      // console.log('Inside',this.scLineUps);
      this._printerService.onDataReady();
    });
  }
}
