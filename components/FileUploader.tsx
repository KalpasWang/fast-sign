import React from 'react';

type Props = {};

export default function FileUploader({}: Props) {
  return (
    <div>
      <label htmlFor='upload'>選擇檔案</label>
      <input type='file' id='upload' accept='.pdf,.jpg,.jpeg,.png' />
    </div>
  );
}
