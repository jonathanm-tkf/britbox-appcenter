import React from 'react';

import { Input as InputStyle, HelperText, Container, Warning, Checked } from './styles';
import { InputProps } from './props';

export const Input = ({ label, error, ...rest }: InputProps) => {
  return (
    <Container>
      <InputStyle label={label} error={(error && error?.text !== '') || false} {...rest} />
      {error && error?.text?.trim() !== '' && <HelperText type="error">{error.text}</HelperText>}
      {error && error?.text !== '' && <Warning />}
      {rest?.value !== '' && error && error?.text === '' && <Checked />}
    </Container>
  );
};
