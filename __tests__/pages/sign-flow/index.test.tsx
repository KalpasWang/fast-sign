import { render, screen } from '@testing-library/react';
import SignFlow from '../../../pages/sign-flow';
import '@testing-library/jest-dom';
import { setupTestStore, store } from '@/store/store';
import { Provider } from 'react-redux';
import { PDFDocument } from 'pdf-lib';
import { saveUploadedFile } from '@/features/signatureSlice';
import { initialState as progressInitialState } from '@/features/progressSlice';

describe('Home', () => {
  it('渲染 store 中的 pdf 檔案到 canvas', async () => {
    expect.hasAssertions();
    // PDF Creation
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('Sample');
    const pdfBytes = await pdfDoc.save();
    // const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    // use generated pdf file to setup store
    const testStore = setupTestStore({
      progress: progressInitialState,
      signature: { rawFile: pdfBytes },
    });
    render(
      <Provider store={testStore}>
        <SignFlow />
      </Provider>
    );

    const canvas = screen.getByTestId('canvas') as HTMLCanvasElement;
    expect(canvas.toDataURL()).toContain('data:application/pdf;base64');
  });

  it('', async () => {});
});
