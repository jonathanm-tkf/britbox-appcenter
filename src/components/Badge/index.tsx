import React, { memo } from 'react';

import { Wrapper, BadgeText } from './styles';

type Props = {
  text: string;
  isGrid: boolean;
};
const Badge = ({ text, isGrid }: Props) => {
  return (
    <Wrapper {...{ isGrid }}>
      <BadgeText>{text}</BadgeText>
    </Wrapper>
  );
};

export default memo(Badge);
