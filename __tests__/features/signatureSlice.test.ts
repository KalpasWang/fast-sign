import { setupTestStore } from '@/store/store';
import { initialState as progressInitialState } from '@/features/progressSlice';
import { initialState as signatureInitialState } from '@/features/signatureSlice';
import { samplePdf, sampleSignature, sampleSignedPdf } from '@/utils/samplePDF';
import { addSignatureToPdf } from '@/features/signatureSlice';

describe('signatureSlice', () => {
  describe('addSignatureToPdf', () => {
    it('沒有 rawFile 會有錯誤訊息', async () => {
      expect.hasAssertions();
      /* 準備 */
      const testStore = setupTestStore({
        progress: progressInitialState,
        signature: signatureInitialState,
      });

      /* 執行 */
      // const result = await testStore.dispatch(addSignatureToPdf()).unwrap();
      /* 驗證 */
      // expect(result).toBe('錯誤：沒有 rawFile');
      await expect(testStore.dispatch(addSignatureToPdf())).toBeRequired();
    });

    it('可以將簽名檔加入到 PDF', async () => {
      expect.hasAssertions();
      /* 準備 */
      const testStore = setupTestStore({
        progress: progressInitialState,
        signature: {
          pending: false,
          rawFile: samplePdf,
          signedFile: null,
          signatures: [sampleSignature],
          error: null,
        },
      });

      /* 執行 */
      const result = await testStore.dispatch(addSignatureToPdf()).unwrap();
      /* 驗證 */
      expect(result).toBe(sampleSignedPdf);
    });
  });
});
