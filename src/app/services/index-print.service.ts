import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Injectable({
  providedIn: 'root',
})
export class IndexPrintService {
  isPrinting = false;
  public lineUpSubject = new BehaviorSubject(null);
  public scorecardSubject = new BehaviorSubject(null);
  scorecard: any;
  data1: any[][] = this.make2DArray(27, 1);
  cont: any[][];
  header1: any[] = ['Name', 'Index', 'LastPlayed'];
  constructor() {}

  printPDF(arr:any[]) {
    var temp = [];
    console.log(arr)
    this.data1[0] = this.header1;
    arr.forEach((item:any, i:number) => {
      temp.push(
        [item.fullNameR],
        [Math.round(item.usgaIndex * 10) / 10],
        [
          new Date(item.lastDatePlayed).toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: '2-digit',
          }),
        ]
      );
      this.data1[i + 1] = temp;
      temp = [];
    });
    this.createPdf();
  }
  createPdf() {
    var doc = new jsPDF('p', 'pt', 'letter');
    var body = this.data1;
    // generate auto table with body
    var y = 30;
    doc.setLineWidth(0);

    autoTable(doc, {
      styles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        cellPadding: 4,
        lineColor: [0, 0, 0],
        lineWidth: 1,
        fontSize: 10,
      },
      columnStyles: {
        0: {
          halign: 'left',
          cellWidth: 100
        },
        1: {
          halign: 'right',
          cellWidth: 35
        },
        2: {
          halign: 'left',
          cellWidth: 70
        },
      },

      margin: { top: 30, left: 8, right: 8 },
      theme: 'grid',
      body: body,
      startY: y,
      showHead: 'everyPage',
      
      didDrawPage: function () {
        // Header
        doc.setFontSize(16);
        doc.setTextColor('#161C22');
        doc.text('Rochester Golf - ' + new Date().toDateString(), 45, 20);
        let pageSize = doc.internal.pageSize;
        let pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
      },
    });

    // save the data to this file
    // doc.save('auto_table_with_javascript_data');

    setTimeout(() => {
      doc.output('dataurlnewwindow');
    }, 100);
  }
  make2DArray(rows, cols) {
    let arr1 = new Array(cols);
    for (var i: number = 0; i < arr1.length; i++) {
      arr1[i] = new Array(rows);
    }
    return arr1;
  }
}
