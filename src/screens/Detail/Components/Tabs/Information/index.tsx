import React from 'react';

import { Information as InformationDataType } from '@src/services/detail';
import { useTranslation } from 'react-i18next';
import { Container, Year, Seasons, Genre, Credits, CreditsBold, Label } from './styles';

interface Props {
  data: InformationDataType;
  onLayout?: (event: any) => void;
}

const Information = ({ data, onLayout }: Props) => {
  const { t } = useTranslation('layout');
  return (
    <Container onLayout={onLayout}>
      {data.customFields.YearRange && (
        <Year>
          <Label>{t('years')}:</Label> {data.customFields.YearRange}
        </Year>
      )}
      {data.type === 'show' && (
        <Seasons>
          <Label>{data.seasons > 1 ? t('seasons') : t('season')}:</Label> {data.seasons}
        </Seasons>
      )}
      {(data.genres || []).length > 0 && (
        <Genre>
          Genre:{' '}
          {(() => {
            const genres = (data.genres || []).map((item) => item[0].toUpperCase() + item.slice(1));
            return genres.join(', ');
          })()}
        </Genre>
      )}

      {(data.credits || []).length > 0 && (
        <Credits>
          <CreditsBold>Credits: </CreditsBold>
          {(() => {
            const name = (data.credits || []).map((item) => item.character);
            return name.join(', ');
          })()}
        </Credits>
      )}
    </Container>
  );
};

export default Information;
