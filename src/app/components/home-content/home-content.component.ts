import { Component, OnInit } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
})
export class HomeContentComponent implements OnInit {
  faLink = faLink;

  constructor() {}

  ngOnInit(): void {
    this.createPdf()
  }

    createPdf() {
      var doc = new jsPDF();
      var doc = new jsPDF("l", "pt", "letter")
    
      doc.setFontSize(18);
      doc.text('Rochester Golf - Sunday, Dec 25, 2022', 45, 20);
      // doc.setFontSize(11);
      doc.setTextColor(100);
      doc.setPage(11);
      
    
      autoTable(doc, {
        styles: { fillColor: [255, 255, 255],textColor: [0,0,0],cellPadding:2,
          lineColor: [0,0,0], lineWidth: 1, },
        margin: {top: 30, left: 8, right: 8},
        theme: 'grid',
        body: [
          [{ content: 'Name', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } },
          { content: '1', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '2',  colSpan: 10, rowSpan: 1, styles: { halign:'center' } },
          { content: '3', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '4', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '5', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '6', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '7', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '8', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '9', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: 'F', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: 'Int', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '10', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '11', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '12', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '13', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '14', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '15', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '16', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '17', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: '18', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: 'B', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: 'Tot', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: 'Net', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
          { content: 'HC', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } }
        ],
        [{ content: 'White', colSpan: 1, rowSpan: 1, styles: { lineWidth: 1, halign: 'left' } },
        { content: '100', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '200',  colSpan: 10, rowSpan: 1, styles: { halign:'center' } },
        { content: '300', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '400', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '500', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '600', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '700', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '800', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '900', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '3100', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: 'Int', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '100', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '110', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '120', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '130', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '140', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '150', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '160', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '170', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '180', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '3200', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: '6300', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: 'Net', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } },
        { content: 'HC', colSpan: 10, rowSpan: 1, styles: { halign: 'center' } }
      ],
      //  
        ],
        didDrawCell: data => {
              console.log(data)
           }
      },
      )
      // Open PDF document in new tab
      doc.output('dataurlnewwindow')
    
      // Download PDF document  
      // doc.save('table.pdf');
    };
  }



