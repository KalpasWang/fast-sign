export function toBase64(buffer: ArrayBuffer | Uint8Array): string {
  let binary = '';
  let bytes: Uint8Array;
  if (buffer instanceof ArrayBuffer) bytes = new Uint8Array(buffer);
  else bytes = buffer;
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function fromBase64(base64: string): Uint8Array {
  const binaryStr = window.atob(base64);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return bytes;
}
