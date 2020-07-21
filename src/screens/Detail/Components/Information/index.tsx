import React from 'react';

import { Container, Year, Seasons, Genre, Credits, CreditsBold } from './styles';

interface Props {
  onLayout?: (event: any) => void;
}

const Information = ({ onLayout }: Props) => {
  return (
    <Container onLayout={onLayout}>
      <Year>Years: 1998 - 2019</Year>
      <Seasons>Seasons: 21</Seasons>
      <Genre>Genre: Mystery</Genre>
      <Credits>
        <CreditsBold>Credits:</CreditsBold>
        John Nettles (DCI Tom Barnaby), Jane Wymark (Joyce Barnaby), Barry Jackson (Dr Bullard),
        Jason Hughes (DS Ben Jones), Neil Dudgeon (DCI John Barnaby ), Fiona Dolman (Sarah Barnaby),
        Laura Howard (Cully Barnaby), Daniel Casey (Sgt. Gavin Troy), Kirsty Dillon (WPC Gail
        Stephens), Tamzin Malleson (Kate Wilding), Nick Hendrix (DS Jamie Winter).
      </Credits>
    </Container>
  );
};

export default Information;
