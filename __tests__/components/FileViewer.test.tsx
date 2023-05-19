import { render, screen } from '@testing-library/react';
import { PDFDocument } from 'pdf-lib';
import FileViewer from '@/components/FileViewer';

describe('FileViewer', () => {
  it.skip('渲染 store 中的 pdf 檔案到 canvas', async () => {
    expect.hasAssertions();
    // PDF Creation
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('Sample');
    const pdfBytes = await pdfDoc.save();
    render(<FileViewer file={pdfBytes} />);

    const canvas = screen.getByRole('canvas') as HTMLCanvasElement;
    expect(canvas.toDataURL()).toContain('data:image/png;base64');
  });
});
