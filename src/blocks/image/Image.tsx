'use client';
import React from 'react';
import NextImage from 'next/image';

import Tooltip from 'src/blocks/tooltip/Tooltip';

import styles from './Image.module.css';
import { IconImage } from 'src/icons';
import { IconContext } from 'react-icons';

export type ImageData = { width: number | null; height: number | null };

export type ImageRequiredProps = {
  alt: string;
  src: string | null;
};

export type ImageOptionalProps = {
  align?: 'left' | 'center' | 'right';
  as?: React.ElementType;
  title?: string | null;
};

export type ImageProps = ImageRequiredProps & ImageOptionalProps & ImageData;

const Image = React.forwardRef<React.ElementType, ImageProps>((props, ref) => {
  const Wrap = props.as || 'div';
  const Caption = Wrap === 'figure' ? 'figcaption' : 'div';

  const height = props.height || 100;
  const width = props.width || 100;

  return (
    <IconContext.Provider value={{ size: '100%' }}>
      <Wrap
        className={[
          'relative mb-4',
          'not-prose',
          styles.image,
          (props.align === 'left' || props.align === 'right') && 'transform w-1/3',
          props.align === 'left' && 'float-left mr-5',
          props.align === 'right' && 'float-right ml-5',
        ]
          .filter(Boolean)
          .join(' ')}
        ref={ref}
      >
        <div className={['relative', 'flex items-center justify-center', 'coat-page-3'].join(' ')}>
          {props.src ? (
            <>
              <NextImage src={props.src} fill alt={props.alt || ''} />
            </>
          ) : (
            <Tooltip className="flex w-1/4 min-w-4 min-h-4" title={props.alt}>
              <IconImage width="100%" height="100%" />
            </Tooltip>
          )}
          <div
            style={{
              paddingBottom: `${(height / width) * 100}%`,
            }}
          />
        </div>
        {props.title && (
          <Caption className="mt-2 text-xs text-text-uncontrasted">{props.title}</Caption>
        )}
      </Wrap>
    </IconContext.Provider>
  );
});

Image.displayName = 'Image';

export default Image;
