import React, { ChangeEvent } from 'react';

type Props = {
  onUpload?: (file: File) => void;
};

export default function FileUploader({ onUpload }: Props) {
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0];
    if (file && onUpload) {
      onUpload(file);
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
