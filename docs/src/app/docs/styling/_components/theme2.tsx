'use client';

import { toast } from 'react-strawberry-toast';
import PlayGroundButton from '@/components/playground-button';
import loadjs from 'loadjs';

export default function Theme2() {
  return (
    <PlayGroundButton
      onClick={() => {
        loadjs('/style2.css', {
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
