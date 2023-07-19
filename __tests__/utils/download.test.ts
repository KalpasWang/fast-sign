import { fromBase64 } from '@/utils/base64';
import { downloadPdf } from '@/utils/download';
import { samplePdf } from '@/utils/samplePDF';
import download from 'downloadjs';

jest.mock('downloadjs', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('download utils', () => {
  describe('downloadPdf', () => {
    it('傳入的 pdfFile 如果無法開啟則拋出錯誤', async () => {
      expect.hasAssertions();
      await expect(downloadPdf('aabbcc', 'sample.pdf')).rejects.toThrowError();
    });

    it('如果 pdfFile 是可以讀取的，則可以下載pdf檔案', async () => {
      expect.assertions(4);
      await downloadPdf(samplePdf, 'sample.pdf');
      expect(download).toHaveBeenCalled();
      expect((download as jest.Mock).mock.calls[0][0]).toEqual(
        fromBase64(samplePdf)
      );
      expect((download as jest.Mock).mock.calls[0][1]).toBe('sample.pdf');
      expect((download as jest.Mock).mock.calls[0][2]).toBe('application/pdf');
    });
  });
});
