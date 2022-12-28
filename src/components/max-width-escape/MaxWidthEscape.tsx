import React, { ReactNode } from 'react';

import styles from './MaxWidthEscape.module.css';

const MaxWidthEscape = (props: { children: ReactNode; className?: string; maxWidth?: string }) => (
  <div
    className={[styles.container, props.className, 'flex justify-center'].filter(Boolean).join(' ')}
  >
    <div style={{ maxWidth: props.maxWidth }}>{props.children}</div>
  </div>
);

export default MaxWidthEscape;
