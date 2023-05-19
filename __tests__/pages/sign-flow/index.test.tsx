import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import SignFlow from '../../../pages/sign-flow';
import { setupTestStore } from '@/store/store';

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
