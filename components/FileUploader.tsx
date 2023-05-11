import React from 'react';
import { toBase64 } from '@/utils/base64';

type Props = {
  onUpload?: (data: string) => void;
};

export default function FileUploader({ onUpload }: Props) {
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0];
    if (file && file?.type === 'application/pdf') {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.addEventListener('loadend', function (e) {
        if (!onUpload || !(e.target?.result instanceof ArrayBuffer)) {
          return;
        }
        const base64 = toBase64(e.target.result);
        onUpload(base64);
      });
    }
  }

  return (
    <form encType='multipart/form-data'>
      <label htmlFor='upload'>選擇檔案</label>
      <input
        type='file'
        id='upload'
        accept='.pdf,.jpg,.jpeg,.png'
        onChange={changeHandler}
      />
    </form>
  );
}
