import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SignFlow from '../../../pages/sign-flow';
import { setupTestStore } from '@/store/store';
import { initialState as progressInitialState } from '@/features/progressSlice';
import { toBase64 } from '@/utils/base64';
import { samplePdf } from '@/utils/samplePDF';

// mock useRouter().push method
const pushMock = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));

describe('sign-flow page', () => {
  it('沒有 rawFile 會跳轉回首頁', async () => {
    const testStore = setupTestStore();
    render(
      <Provider store={testStore}>
        <SignFlow />
      </Provider>
    );

    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('點擊完成會跳出 alert，點擊確認會跳到下載頁面', async () => {
    expect.hasAssertions();
    /* 準備 */
    // use default sample pdf file to setup store
    const user = userEvent.setup();
    const testStore = setupTestStore({
      progress: progressInitialState,
      signature: {
        rawFile: toBase64(samplePdf),
        signedFile: null,
        signatures: [],
      },
    });
    render(
      <Provider store={testStore}>
        <SignFlow />
        <div id='dialog'></div>
      </Provider>
    );

    /* 執行 */
    const nextButton = screen.getByRole('button', { name: /下一步/ });
    await user.click(nextButton);
    const confirmButton = await screen.findByRole('button', { name: /確認/ });
    await user.click(confirmButton);
    /* 驗證 */
    expect(pushMock).toHaveBeenCalledWith('/download');
  });
});
