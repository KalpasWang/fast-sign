import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: '快速省時的電子簽署工具',
    });

    expect(heading).toBeInTheDocument();
  });

  it('上傳符合格式的檔案會跳到 upload 頁面', async () => {});
});
