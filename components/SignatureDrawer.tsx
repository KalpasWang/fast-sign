import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fabric } from 'fabric';

type Props = {};

export default function SignatureDrawer({}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<fabric.Canvas>();

  useEffect(() => {
    if (!containerRef.current) return;

    fabricRef.current = new fabric.Canvas('sign-canvas', {
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
      <canvas id='sign-canvas' />
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
