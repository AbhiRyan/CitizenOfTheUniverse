import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Citizen Of The Universe';
  protected citizenName = 'Freakish The Amazing';
  protected isSentient = false;

  generatePDF() {
    const element = document.getElementById('certificate');
    if (!element) {
      console.error('Element not found!');
      return;
    }

    // Adjust scale dynamically based on viewport width
    const scaleFactor = window.innerWidth < 768 ? 4 : 2; // Higher scale for smaller screens

    html2canvas(element, { scale: scaleFactor }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(
        imgData,
        'JPEG',
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        'MEDIUM'
      );
      pdf.save('CitizenCertificate.pdf');
    });
  }
}
