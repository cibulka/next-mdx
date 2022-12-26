import React from 'react';
import NextImage from 'next/image';

export type ImageData = { width: number; height: number };

const Image = (
  props: {
    align: 'left' | 'center' | 'right';
    alt: string;
    src: string;
    title: string | null;
  } & ImageData,
) => {
  return (
    <div className="relative">
      <NextImage src={props.src} fill alt={props.alt || ''} style={{ objectFit: 'cover' }} />
      <div style={{ paddingBottom: `${(props.height / props.width) * 100}%` }} />
    </div>
  );
};

export default Image;
