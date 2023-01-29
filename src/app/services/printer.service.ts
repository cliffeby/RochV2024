import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { Strokes2Service } from './strokes2.service';

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
    private _strokes2Service: Strokes2Service) {
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
    // var keys = Object.keys(this.lineUpData); // keys in array   -- used to get array length
    var j: number = 13; // number of rows on scorecard
    const pd = this._strokes2Service.createPlayerArrayfromLineUp(this.lineUpData);  
    // console.log('pd............',pd)
    for (var fs: number = 0; fs < pd[0].player.length/4; fs++) {
      this.temp =
        [{ content: this.header1[0], colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: this.header1[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 0] = this.temp;

      this.temp = [{ content: pd[0].player[fs*4].sc, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: pd[0].scYards[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 1] = this.temp;

      this.temp = [{ content: 'Par', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: pd[0].scPars[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }

      this.data1[fs * j + 2] = this.temp;

      this.temp = [{ content: 'Index', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: pd[0].scHCaps[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }

      this.data1[fs * j + 3] = this.temp;
      this.data2 = this.data1

      const name1 = pd[0].player[fs*4].fullName + '-'+ Math.round(pd[0].player[fs*4].usgaIndex * 10)/10;
      this.temp = [{ content: name1, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 24; i++) {
        this.temp.push({ content: pd[0].player[fs*4].markup[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'right' } })
      }
      this.temp.push({ content: pd[0].player[fs*4].handicap, colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      this.data1[fs * j + 4] = this.temp;

      const name2 = pd[0].player[fs*4+1].fullName + '-'+ Math.round(pd[0].player[fs*4 +1].usgaIndex * 10)/10;
      this.temp = [{ content: name2, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 24; i++) {
        this.temp.push({ content: pd[0].player[fs*4+1].markup[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'right'} })
      }
      this.temp.push({ content: pd[0].player[fs*4+1].handicap, colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
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
      const name3 = pd[0].player[fs*4 +2].fullName + '-'+ Math.round(pd[0].player[fs*4 +2].usgaIndex * 10)/10;
      this.temp = [{ content: name3, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 24; i++) {
        this.temp.push({ content: pd[0].player[fs*4+2].markup[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'right' } })
      }
      this.temp.push({ content: pd[0].player[fs*4+2].handicap, colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      this.data1[fs * j + 10] = this.temp;

      const name4 = pd[0].player[fs*4+3].fullName + '-'+ Math.round(pd[0].player[fs*4 +3].usgaIndex * 10)/10;
      this.temp = [{ content: name4, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 24; i++) {
        this.temp.push({ content: pd[0].player[fs*4+3].markup[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'right' } })
      }
      this.temp.push({ content: pd[0].player[fs*4+3].handicap, colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      this.data1[fs * j + 11] = this.temp;

      this.temp = [{ content: 'OneBall', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[fs * j + 12] = this.temp;

    }
    return this.data1
  }
  createPdf(match) {
    const pdfData = this.createData();
    var doc = new jsPDF();
    var doc = new jsPDF("l", "pt", "letter")
    var body = pdfData
    var slicedBody;
    var y: number;

    setTimeout(() => {
      var keys = Object.keys(this.lineUpData);
      console.log('keys', keys);
      var rs: number = 0; //starting row
      var re: number = 13; //ending row
      var headerText = 'Rochester Golf - ' + match.name + '  ' + new Date(this.lineUpData[0].playerA.datePlayed)
      .toLocaleDateString("en-US", {weekday: 'long', month:'long', day:'numeric', year: 'numeric'});
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
            doc.text(headerText, 45, 20);
            let pageSize = doc.internal.pageSize;
            let pageHeight = pageSize.height
              ? pageSize.height
              : pageSize.getHeight();
            doc.text(headerText, 45, (pageHeight - 10) / 2 + 35);
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
  make2DArray(rows:number, cols:number) {
    let arr1 = new Array(cols);
    for (var i: number = 0; i < arr1.length; i++) {
      arr1[i] = new Array(rows);
    }
    return arr1
  }
}