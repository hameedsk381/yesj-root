import { Button } from '@mantine/core';

export function TwitterButton(props) {
  return (
    <Button
      leftSection={<>
      <i className="fa fa-twitter" aria-hidden="true"></i>
      </>}
      variant="default"
      {...props}
    />
  );
}