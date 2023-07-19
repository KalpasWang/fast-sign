import download from 'downloadjs';
import { PDFDocument } from 'pdf-lib';
import { fromBase64 } from './base64';

export async function downloadPdf(pdfFile: string, fileName: string) {
  try {
    const pdf = await PDFDocument.load(pdfFile);
    download(fromBase64(pdfFile), fileName, 'application/pdf');
  } catch (e: any) {
    throw new Error('錯誤：無法下載檔案');
  }
}
