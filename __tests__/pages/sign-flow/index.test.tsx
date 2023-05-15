import { render, screen } from '@testing-library/react';
import SignFlow from '../../../pages/sign-flow';
import '@testing-library/jest-dom';
import { setupTestStore } from '@/store/store';
import { Provider } from 'react-redux';
import { PDFDocument } from 'pdf-lib';
import { initialState as progressInitialState } from '@/features/progressSlice';
import { toBase64 } from '@/utils/base64';

// mock useRouter().push method
const pushMock = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

describe('Home', () => {
  it.skip('渲染 store 中的 pdf 檔案到 canvas', async () => {
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
      signature: { rawFile: toBase64(pdfBytes) },
    });
    render(
      <Provider store={testStore}>
        <SignFlow />
      </Provider>
    );

    const canvas = screen.getByTestId('canvas') as HTMLCanvasElement;
    expect(canvas.toDataURL()).toContain('data:application/pdf;base64');
  });

  it('沒有 rawFile 會跳轉回首頁', async () => {
    const testStore = setupTestStore();
    render(
      <Provider store={testStore}>
        <SignFlow />
      </Provider>
    );

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
