import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import Home from '../../pages/index';
import '@testing-library/jest-dom';
import { PDFDocument } from 'pdf-lib';

// mock useRouter().push method
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
// mock useAppDispatch() method
const mockDispatch = jest.fn();
jest.mock('../../store/hooks', () => {
  return {
    useAppDispatch: () => mockDispatch,
  };
});

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: '快速省時的電子簽署工具',
    });

    expect(heading).toBeInTheDocument();
  });

  it('上傳pdf檔案會顯示「上傳成功」並跳到 sign-flow 頁面', async () => {
    expect.hasAssertions();
    render(<Home />);
    // PDF Creation
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('Sample');
    const pdfBytes = await pdfDoc.save();
    const file = new File([pdfBytes], 'sample.pdf', {
      type: 'application/pdf',
    });

    const input = screen.getByLabelText(/選擇檔案/i) as HTMLInputElement;
    await user.upload(input, file);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith('/sign-flow');
    });
  });
});
