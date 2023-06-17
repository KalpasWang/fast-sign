import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Download from '../../pages/download';
import { setupTestStore } from '@/store/store';
import { initialState as progressInitialState } from '@/features/progressSlice';
import { toBase64 } from '@/utils/base64';
import { samplePdf } from '@/utils/samplePDF';
import { Signature } from '@/features/signatureSlice';
import { downloadPdf } from '@/utils/download';

// mock downloadjs
jest.mock('../../utils/download.ts', () => ({
  downloadPdf: jest.fn(),
}));
// mock useRouter().push method
const pushMock = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

describe('download page', () => {
  it('沒有 rawFile 會跳轉回首頁', async () => {
    const testStore = setupTestStore();
    render(
      <Provider store={testStore}>
        <Download />
      </Provider>
    );

    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('點擊下載檔案可以下載 pdf 檔，點擊回到首頁返回首頁', async () => {
    expect.hasAssertions();
    /* 準備 */
    // use default sample pdf file to setup store
    const user = userEvent.setup();
    const testStore = setupTestStore({
      progress: progressInitialState,
      signature: {
        pending: false,
        rawFile: toBase64(samplePdf),
        signedFile: toBase64(samplePdf),
        signatures: [sampleSignature],
        error: null,
      },
    });

    render(
      <Provider store={testStore}>
        <Download />
      </Provider>
    );

    /* 執行與驗證 */
    // 驗證可以回首頁
    const backHomeLink = screen.getByRole('link', { name: /回到首頁/ });
    expect(backHomeLink).toHaveAttribute('href', '/');
    // 驗證可以下載檔案
    await user.click(screen.getByRole('button', { name: /下載檔案/ }));
    expect(downloadPdf).toHaveBeenCalledTimes(1);
  });
});

const sampleSignature: Signature = {
  id: 'texture1',
  file: 'data:image/png;base64,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',
  x: 11,
  y: 11,
  width: 442,
  height: 177,
  pageNumber: 1,
  rotation: 0,
};
