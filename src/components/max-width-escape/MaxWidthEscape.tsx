import React, { ReactNode, forwardRef, ForwardedRef } from 'react';

import styles from './MaxWidthEscape.module.css';

const MaxWidthEscape = (
  props: { as?: React.ElementType; children: ReactNode; className?: string; maxWidth?: string },
  ref: ForwardedRef<React.ElementType>,
) => {
  const Wrap = props.as || 'div';
  return (
    <Wrap className={[styles.container, props.className].filter(Boolean).join(' ')} ref={ref}>
      <div style={{ maxWidth: props.maxWidth }}>{props.children}</div>
    </Wrap>
  );
};

export default forwardRef(MaxWidthEscape);
