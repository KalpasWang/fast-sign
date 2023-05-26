import { useRef, useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export default function Dialog(props: Props) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#dialog');
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <DialogContainer>{props.children}</DialogContainer>,
        ref.current
      )
    : null;
}

const DialogContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 900;
`;
