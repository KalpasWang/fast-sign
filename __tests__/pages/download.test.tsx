import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Download from '../../pages/download';
import { setupTestStore } from '@/store/store';
import { initialState as progressInitialState } from '@/features/progressSlice';
import { samplePdf, sampleSignature, sampleSignedPdf } from '@/utils/samplePDF';
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
    expect.assertions(2);
    /* 準備 */
    // use default sample pdf file to setup store
    const user = userEvent.setup();
    const testStore = setupTestStore({
      progress: progressInitialState,
      signature: {
        pending: false,
        rawFile: samplePdf,
        signedFile: sampleSignedPdf,
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
