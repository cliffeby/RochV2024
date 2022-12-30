import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { ScorecardsService } from './scorecards.service';
import { MembersService } from './members.service';
import { memberRoute } from 'menu-api copy/src/routes/member.route';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  isPrinting = false;
  public lineUpSubject = new BehaviorSubject(null);
  data1: any[][] = this.make2DArray(4,4);
  data2: any[][] = this.make2DArray(2, 4);
  cont: any[][]
  header1: any[] = ['Name', 1, 2, 3, 4, 5, 6, 7, 8, 9, 'F', 'Int', 10, 11, 12, 13, 14, 15, 16, 17, 18, 'B', 'Tot', 'Net', 'HC']
  temp: any[];
  lineUpData: any;
  constructor(private router: Router,
    private _scorecardsService: ScorecardsService,
    private _membersService: MembersService) {



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
    this.header1.forEach((x, index) => { this.data1[0][index] = x });
    this.lineUpData = this.lineUpSubject.getValue();
    console.log('LUD', this.lineUpData, 'ID', this.lineUpData[0].playerA.scorecardId)
    this._scorecardsService.getScorecard(this.lineUpData[0].playerA.scorecardId).subscribe((sc) => {
      console.log('Scorecard from Printer Service', sc);
      this.data1[0] =
        [{ content: this.header1[0], colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 25; i++) {
        this.data1[0].push({ content: this.header1[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.temp = [{ content: 'White', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 22; i++) {
        this.temp.push({ content: sc.scorecard.yards[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      for (var i = 1; i < 4; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[1] = this.temp;
      this.temp = [{ content: 'Par', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 22; i++) {
        this.temp.push({ content: sc.scorecard.pars[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      for (var i = 1; i < 4; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[2] = this.temp;
      this.temp = [{ content: 'Index', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
      for (var i = 1; i < 20; i++) {
        this.temp.push({ content: sc.scorecard.hCaps[i], colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      for (var i = 1; i < 7; i++) {
        this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
      }
      this.data1[3] = this.temp;

    })
    const name1 = this.lineUpData[0].playerA.firstName + " " + this.lineUpData[0].playerA.lastName;
    this.temp = [{ content: name1, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
    for (var i = 1; i < 27; i++) {
      this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
    }
    this.data1[4] = this.temp;

    const name2 = this.lineUpData[0].playerB.firstName + " " + this.lineUpData[0].playerB.lastName;
    this.temp = [{ content: name2, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
    for (var i = 1; i < 27; i++) {
      this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
    }
    this.data1[5] = this.temp;



    this.temp = [{ content: 'OneBall', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
    for (var i = 1; i < 27; i++) {
      this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
    }
    this.data1[6]= this.temp;

    this.temp = [{ content: '+', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
    for (var i = 1; i < 27; i++) {
      this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
    }
    this.data1[7] = this.temp;
    this.data1[8] = this.temp;
    this.data1[9] = this.temp;

    const name3 = this.lineUpData[1].playerA.firstName + " " + this.lineUpData[1].playerA.lastName;
    this.temp = [{ content: name3, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
    for (var i = 1; i < 27; i++) {
      this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
    }
    this.data1[10] = this.temp;

    const name4 = this.lineUpData[1].playerB.firstName + " " + this.lineUpData[1].playerB.lastName;
    this.temp = [{ content: name4, colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
    for (var i = 1; i < 27; i++) {
      this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
    }
    this.data1[11] = this.temp;
    this.temp = [{ content: 'OneBall', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } }];
    for (var i = 1; i < 27; i++) {
      this.temp.push({ content: '', colSpan: 10, rowSpan: 1, styles: { lineWidth: 1, halign: 'center' } })
    }
    this.data1[12]= this.temp;

    // this.data1 = this.data1.concat(this.data1);

    return this.data1
  }
  createPdf() {

    console.log('data1', this.lineUpSubject.getValue())
    const pdfData = this.createData();
    console.log('body', pdfData)
    var doc = new jsPDF();
    var doc = new jsPDF("l", "pt", "letter")
    var body = pdfData
    var y:number;
  
    setTimeout(() => {
      for (let i:number =0; i<4;i++){
    doc.setFontSize(18);
    // doc.text('Rochester Golf - Sunday, Dec 25, 2022', 45, 20);
    doc.setTextColor(100);
    doc.autoPrint();
    if (i%2==1){y =350}else{y=25}

      autoTable(doc, {
        styles: {
          fillColor: [255, 255, 255], textColor: [0, 0, 0], cellPadding: 2,
          lineColor: [0, 0, 0], lineWidth: 1, fontSize:10, 
        },
        margin: { top: 30, left: 8, right: 8 },
        theme: 'grid',
        body: body,
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
        doc.text("Rochester Golf - Sunday, Dec 25, 2022", 45, (pageHeight - 10)/2 +35);
        if (i>0 && i%2){doc.addPage()}
        
      }

      }
      )}
    }, 500)

    setTimeout(() => {
      doc.output('dataurlnewwindow')
      // doc.save('table.pdf');
    }, 1000)
  };
  make2DArray(rows, cols) {
    let arr1 = new Array(cols);
    for (var i: number = 0; i < arr1.length; i++) {
      arr1[i] = new Array(rows);
    }
    return arr1
  }

}
