'use client';

import { Button, Text } from "@radix-ui/themes";
import { toast } from "@react-strawberry-toast/src";

export function HomeToastBtn() {
  const onClick = () => {
    toast.success('react-strawberry-toast');
  }

  return (
    <Button size="3" color="ruby" type="button"
      style={{
        width: '144px',
        boxShadow: 'var(--shadow-4)',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Text weight='bold'>Create a Toast</Text>
    </Button>
  );
}