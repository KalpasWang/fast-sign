import React, { ChangeEvent } from 'react';

type Props = {
  onUpload?: (blob: ArrayBuffer) => void;
};

export default function FileUploader({ onUpload }: Props) {
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0];
    if (file && file?.type === 'application/pdf') {
      console.log(file);
      const fileReader = new FileReader();
      fileReader.addEventListener('load', function (e) {
        console.log(e);
        if (this.result instanceof ArrayBuffer && onUpload) {
          onUpload(this.result);
        }
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
