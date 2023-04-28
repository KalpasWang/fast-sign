import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Home from '../../pages/index';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

const pushMock = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: pushMock,
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: '快速省時的電子簽署工具',
    });

    expect(heading).toBeInTheDocument();
  });

  it('上傳符合格式的檔案會顯示 上傳成功 並跳到 sign-flow 頁面', async () => {
    expect.hasAssertions();
    render(<Home />);
    const file2 = new File(['hello'], 'hello.png', { type: 'image/png' });

    const input = screen.getByLabelText(/選擇檔案/i) as HTMLInputElement;
    await user.upload(input, file2);

    const text = await screen.findByText(/上傳成功/);
    expect(text).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/sign-flow');
  });
});
