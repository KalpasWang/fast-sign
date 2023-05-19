import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import FileUploader from '../../components/FileUploader';
import '@testing-library/jest-dom';
import SignatureDrawer from '@/components/SignatureDrawer';

describe('SignatureDrawer', () => {
  it('按下「創建簽名檔」會產生可以簽名的畫布，並且可以按儲存變成 image', async () => {
    expect.hasAssertions();

    render(<SignatureDrawer />);
    await user.click(screen.getByRole('button', { name: /創建簽名檔/ }));

    const canvas = screen.getByRole('img', { name: /簽名畫布/ });
    const saveBtn = screen.getByRole('button', { name: /儲存/ });

    expect(canvas).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();

    await user.click(saveBtn);
    expect(screen.getByRole('img', { name: /簽名檔/ })).toBeInTheDocument();
  });

  it('簽名可以拖移到 pdf canvas 上', () => {});
});
