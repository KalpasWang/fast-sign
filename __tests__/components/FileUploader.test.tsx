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
    const file1 = new File([pdfBytes], 'sample.pdf', {
      type: 'application/octet-stream',
    });
    // render
    render(<FileUploader />);

    const input = screen.getByLabelText(/選擇檔案/i) as HTMLInputElement;
    await user.upload(input, file1);

    expect(input.files).toHaveLength(1);
    expect(input.files?.[0]).toStrictEqual(file1);
    expect(input.files?.item(0)).toStrictEqual(file1);
  });

  it('可以上傳 png', async () => {
    expect.hasAssertions();

    // create png
    const file2 = new File(['hello'], 'hello.png', { type: 'image/png' });
    // render
    render(<FileUploader />);

    const input = screen.getByLabelText(/選擇檔案/i) as HTMLInputElement;
    await user.upload(input, file2);

    expect(input.files).toHaveLength(1);
    expect(input.files?.[0]).toStrictEqual(file2);
    expect(input.files?.item(0)).toStrictEqual(file2);
  });

  it('可以上傳 jpg', async () => {
    expect.hasAssertions();

    // create png
    const file3 = new File(['hello'], 'hello.jpg', { type: 'image/jpg' });
    // render
    render(<FileUploader />);

    const input = screen.getByLabelText(/選擇檔案/i) as HTMLInputElement;
    await user.upload(input, file3);

    expect(input.files).toHaveLength(1);
    expect(input.files?.[0]).toStrictEqual(file3);
    expect(input.files?.item(0)).toStrictEqual(file3);
  });

  it('可以上傳 jpeg', async () => {
    expect.hasAssertions();

    // create png
    const file4 = new File(['hello'], 'hello.jpeg', { type: 'image/jpeg' });
    // render
    render(<FileUploader />);

    const input = screen.getByLabelText(/選擇檔案/i) as HTMLInputElement;
    await user.upload(input, file4);

    expect(input.files).toHaveLength(1);
    expect(input.files?.[0]).toStrictEqual(file4);
    expect(input.files?.item(0)).toStrictEqual(file4);
  });
});
