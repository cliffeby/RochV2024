import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { ScorecardsService } from './scorecards.service';
import { MembersService } from './members.service';
import { memberRoute } from 'menu-api copy/src/routes/member.route';
import { ScoresService } from './scores.service';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  isPrinting = false;
  public lineUpSubject = new BehaviorSubject(null);
  public scorecardSubject = new BehaviorSubject(null);
  scorecard: any;
  data1: any[][] = this.make2DArray(27, 1);
  data2: any[][] = this.make2DArray(2, 2);
  cont: any[][]
  header1: any[] = ['Name', 1, 2, 3, 4, 5, 6, 7, 8, 9, 'F', 'Int', 10, 11, 12, 13,
    14, 15, 16, 17, 18, 'B', 'Tot', 'Net', 'HC', ' ', ' ']
  temp: any[];
  lineUpData: any;
  lineUpLength: number;
  constructor(private router: Router,
    private _scorecardsService: ScorecardsService,
    private _membersService: MembersService,
    private _scoresService: ScoresService) {
  }

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
  createData() {
    this.lineUpData = this.lineUpSubject.getValue();
    var keys = Object.keys(this.lineUpData); // keys in array   -- used to get array length
    var j: number = 13; // number of rows on scorecard
    const scHCaps = this._scoresService.stringToArraySC(this.lineUpData[0].playerA.scHCapInputString);
    const scPars = this._scoresService.stringToArraySC(this.lineUpData[0].playerA.scParInputString);
    const scYards = this._scoresService.stringToArraySC(this.lineUpData[0].playerA.scYardInputString);
    for (var fs: number = 0; fs < keys.length / 2 - 1; fs++) {
      this.temp =
        [{ content: this.header1[0], colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: this.header1[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 0] = this.temp;

      this.temp = [{ content: 'White', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 22; i++) {
        this.temp.push({ content: scYards[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      for (var i = 1; i < 4; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 1] = this.temp;

      this.temp = [{ content: 'Par', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 22; i++) {
        this.temp.push({ content: scPars[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      for (var i = 1; i < 4; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 2] = this.temp;

      this.temp = [{ content: 'Index', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 20; i++) {
        this.temp.push({ content: scHCaps[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      for (var i = 1; i < 6; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 3] = this.temp;
      this.data2 = this.data1

      const name1 = this.lineUpData[fs * 2].playerA.firstName + " " + this.lineUpData[fs * 2].playerA.lastName;
      this.temp = [{ content: name1, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 4] = this.temp;

      const name2 = this.lineUpData[fs * 2].playerB.firstName + " " + this.lineUpData[fs * 2].playerB.lastName;
      this.temp = [{ content: name2, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: '/  *', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'right'} })
      }
      this.data1[fs * j + 5] = this.temp;

      this.temp = [{ content: 'OneBall', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 6] = this.temp;

      this.temp = [{ content: '+', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 7] = this.temp;
      this.data1[fs * j + 8] = this.temp;
      this.data1[fs * j + 9] = this.temp;
      console.log('fs', fs)
      const name3 = this.lineUpData[fs * 2 + 1].playerA.firstName + " " + this.lineUpData[fs * 2 + 1].playerA.lastName;
      this.temp = [{ content: name3, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 10] = this.temp;

      const name4 = this.lineUpData[fs * 2 + 1].playerB.firstName + " " + this.lineUpData[fs * 2 + 1].playerB.lastName;
      this.temp = [{ content: name4, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 11] = this.temp;

      this.temp = [{ content: 'OneBall', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 12] = this.temp;

    }
    // console.log('this.data1', this.data1)

    return this.data1
  }
  createPdf() {
    const pdfData = this.createData();
    var doc = new jsPDF();
    var doc = new jsPDF("l", "pt", "letter")
    var body = pdfData
    var slicedBody;
    var y: number;

    setTimeout(() => {
      var keys = Object.keys(this.lineUpData);
      var rs: number = 0; //starting row
      var re: number = 13; //ending row
      for (let i: number = 0; i < keys.length - 1; i++) {  // 4 = number of teams i.e. 8 players
        doc.setFontSize(18);
        doc.setTextColor(100);
        doc.autoPrint();
        if (i % 2 == 1) {
          y = 350; slicedBody = body.slice(rs, re).map(i => i.slice(0, 25 + 1));
          rs = rs + 13;
          re = re + 13;
          console.log(i, 'odd', slicedBody)
        } else {
          y = 25; slicedBody = body.slice(rs, re).map(i => i.slice(0, 25 + 1));
          console.log(i, 'even', slicedBody)
        }

        autoTable(doc, {
          styles: {
            fillColor: [255, 255, 255], textColor: [0, 0, 0], cellPadding: 2,
            lineColor: [0, 0, 0], lineWidth: 1, fontSize: 10,
          },
          margin: { top: 30, left: 8, right: 8 },
          theme: 'grid',
          body: slicedBody,
          startY: y,
          showHead: "everyPage",
          didDrawPage: function () {
            // Header
            doc.setFontSize(16);
            doc.setTextColor("#161C22");
            doc.text('Rochester Golf - Sunday, Dec 25, 2022', 45, 20);
            let pageSize = doc.internal.pageSize;
            let pageHeight = pageSize.height
              ? pageSize.height
              : pageSize.getHeight();
            doc.text("Rochester Golf - Sunday, Dec 25, 2022", 45, (pageHeight - 10) / 2 + 35);
            if (i > 0 && i < keys.length - 2 && i % 2) { doc.addPage() }
          }
        }
        )
      }
    }, 0)

    setTimeout(() => {
      doc.output('dataurlnewwindow')
    }, 100)
  };
  make2DArray(rows, cols) {
    let arr1 = new Array(cols);
    for (var i: number = 0; i < arr1.length; i++) {
      arr1[i] = new Array(rows);
    }
    return arr1
  }
}