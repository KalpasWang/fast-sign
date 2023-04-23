import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import FileUploader from '../../components/FileUploader';
import '@testing-library/jest-dom';
import { PDFDocument } from 'pdf-lib';

describe('FileUploader', () => {
  it('可以上傳 pdf', async () => {
    expect.hasAssertions();

    // PDF Creation
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('You can create PDFs!');
    const pdfBytes = await pdfDoc.save();
    const file = new File([pdfBytes], 'sample.pdf', {
      type: 'application/octet-stream',
    });
    // render
    render(<FileUploader />);

    const input = screen.getByLabelText(/選擇檔案/i) as HTMLInputElement;
    user.upload(input, file);

    expect(input.files).toHaveLength(1);
    // expect(input.files?.).toStrictEqual(file)
    expect(input.files?.item(0)).toStrictEqual(file);
  });
});
