import download from 'downloadjs';
import { PDFDocument } from 'pdf-lib';

export async function downloadPdf(pdfFile: string, fileName: string) {
  const pdf = await PDFDocument.load(pdfFile);
  const pdfBytes = await pdf.save();
  download(pdfBytes, fileName, 'application/pdf');
}
