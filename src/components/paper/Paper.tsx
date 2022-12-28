import React, { ReactNode, StyleHTMLAttributes } from 'react';

import styles from './Paper.module.css';

type PaperElevation = 1 | 2 | 3 | 4 | 5;

type PaperProps = {
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
  isDark?: boolean;
  isHover?: boolean;
  elevation?: PaperElevation;
  style?: React.CSSProperties;
};

function getClassNames(elevation: PaperElevation, isHover: boolean) {
  let result: string[] = [];
  for (let i = 1; i < 6; i += 1) {
    if (i !== elevation) continue;
    result = [...result, styles[`shadow-${i}`]];
    if (isHover) result = [...result, styles[`shadow-${i}-hover`]];
  }
  return result;
}

const Paper = React.forwardRef<React.ElementType, PaperProps>((props, ref) => {
  const El = props.as || 'div';
  const classNames = getClassNames(props.elevation || 1, Boolean(props.isHover));

  return (
    <El
      className={[
        props.className || 'coat-paper',
        styles.paper,
        props.isHover && 'transition-shadow',
        ...classNames,
      ]
        .filter(Boolean)
        .join(' ')}
      ref={ref}
      style={props.style}
    >
      {props.children}
    </El>
  );
});

Paper.displayName = 'Paper';

export default Paper;
