import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { fabric } from 'fabric';
import Image from 'next/image';

type Props = {};

export default function SignatureDrawer({}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<fabric.Canvas>();
  const [isShowingCanvas, setIsShowingCanvas] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>();

  const saveSignature = useCallback(() => {
    if (!fabricRef.current) return;

    const img = fabricRef.current.toDataURL();
    setPreviewUrl(img);
    setIsShowingCanvas(false);
    fabricRef.current.clear();
    fabricRef.current.isDrawingMode = false;
    fabricRef.current.dispose();
  }, []);

  const onCanvasMounted = useCallback((node: HTMLCanvasElement) => {
    if (!node) return;
    if (!containerRef.current) return;

    fabricRef.current = new fabric.Canvas(node, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      backgroundColor: '#fff',
    });
    fabricRef.current.isDrawingMode = true;
    fabricRef.current.freeDrawingBrush.width = 4;
    fabricRef.current.freeDrawingBrush.color = '#000';
  }, []);

  return (
    <Container ref={containerRef}>
      <button type='button' onClick={() => setIsShowingCanvas(true)}>
        創建簽名檔
      </button>
      {isShowingCanvas && (
        <div>
          <canvas
            ref={onCanvasMounted}
            id='sign-canvas'
            role='img'
            title='簽名畫布'
          />
          <button type='button' onClick={() => saveSignature()}>
            儲存
          </button>
        </div>
      )}
      {previewUrl && (
        <ul style={{ listStyle: 'none' }}>
          <li>
            <Image src={previewUrl} alt='簽名檔' width={200} height={100} />
          </li>
        </ul>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-width: 15rem;
  height: 12rem;
  margin-top: 2rem;
  background-color: #888;
`;
