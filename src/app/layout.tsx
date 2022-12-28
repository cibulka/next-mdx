import { ReactNode } from 'react';

import 'src/styles/app.css';
import 'src/styles/colors.css';
import 'src/styles/debug.css';
import 'src/styles/format.css';
import 'src/styles/globals.css';

export default function RootLayout(props: { children: ReactNode }) {
  return props.children;
}
