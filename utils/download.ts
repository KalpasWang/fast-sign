import download from 'downloadjs';
import { PDFDocument } from 'pdf-lib';

export async function downloadPdf(pdfFile: string, fileName: string) {
  try {
    const pdf = await PDFDocument.load(pdfFile);
    download(pdfFile, fileName, 'application/pdf');
  } catch (e: any) {
    throw new Error('錯誤：無法下載檔案');
  }
}
