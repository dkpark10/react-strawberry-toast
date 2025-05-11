'use client';

import { toast } from 'react-strawberry-toast';
import PlayGroundButton from '@/components/playground-button';
import loadjs from 'loadjs';

export default function Theme2() {
  return (
    <PlayGroundButton
      onClick={() => {
        const cssPath = process.env.NODE_ENV === 'development' ? '/style2.css' : '/react-strawberry-toast/style2.css';
        loadjs(cssPath, {
          success: () => {
            toast.success('theme2');
          },

          error: (err) => {
            console.log(err);
          },
        });
      }}
    >
      theme2
    </PlayGroundButton>
  );
}
