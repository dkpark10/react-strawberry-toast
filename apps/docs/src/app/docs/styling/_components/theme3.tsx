'use client';

import { toast } from 'react-strawberry-toast';
import PlayGroundButton from '@/components/playground-button';
import loadjs from 'loadjs';

export default function Theme3() {
  return (
    <PlayGroundButton
    onClick={() => {
      const cssPath = process.env.NODE_ENV === 'development' ? '/style3.css' : '/react-strawberry-toast/style3.css';
      loadjs(cssPath, {
        success: () => {
          toast.success('theme3');
        },

        error: (err) => {
          console.log(err);
        },
      });
    }}
    >
      theme3
    </PlayGroundButton>
  );
}
