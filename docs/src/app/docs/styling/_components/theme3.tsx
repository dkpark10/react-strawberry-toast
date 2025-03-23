'use client';

import { toast } from 'react-strawberry-toast';
import PlayGroundButton from '@/components/playground-button';
import loadjs from 'loadjs';

export default function Theme3() {
  return (
    <PlayGroundButton
    onClick={() => {
      loadjs('/style3.css', {
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
