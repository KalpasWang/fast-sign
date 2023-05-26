import { render, screen } from '@testing-library/react';
import FileViewer from '@/components/FileViewer';
import { samplePdf, samplePdfDataUrl } from '@/utils/samplePDF';

describe('FileViewer', () => {
  it('渲染 store 中的 pdf 檔案到 canvas', async () => {
    expect.hasAssertions();
    render(<FileViewer file={samplePdf} />);

    const canvas = screen.getByRole('img', {
      name: /pdf viewer/i,
    }) as HTMLCanvasElement;
    expect(canvas.toDataURL()).toContain('data:image/png;base64');
    expect(canvas.toDataURL()).toBe(samplePdfDataUrl);
  });
});
