import React from 'react';

import { Information as InformationDataType } from '@src/services/detail';
import { useTranslation } from 'react-i18next';
import { getDuration } from '@src/utils/template';
import { Container, Row, LabelBold } from './styles';

interface Props {
  data: InformationDataType;
  onLayout?: (event: any) => void;
}

const Information = ({ data, onLayout }: Props) => {
  const { t } = useTranslation('layout');
  return (
    <Container onLayout={onLayout}>
      {data?.customFields?.YearRange && (
        <Row>
          <LabelBold>{t('years')}:</LabelBold> {data.customFields.YearRange}
        </Row>
      )}
      {data.type === 'show' && (
        <Row>
          <LabelBold>{data.seasons > 1 ? t('seasons') : t('season')}:</LabelBold> {data.seasons}
        </Row>
      )}
      {data.type === 'movie' && (
        <Row>
          <LabelBold>{t('duration')}:</LabelBold> {getDuration(data.duration)} min
        </Row>
      )}
      {(data.genres || []).length > 0 && (
        <Row>
          <LabelBold>Genre: </LabelBold>
          {(() => {
            const genres = (data.genres || [])
              .filter((item) => item.character !== '')
              .map((item) => item[0].toUpperCase() + item.slice(1));
            return genres.join(', ');
          })()}
        </Row>
      )}

      {(data.credits || []).length > 0 && (
        <Row>
          <LabelBold>Credits: </LabelBold>
          {(() => {
            const name = (data.credits || [])
              .filter((item) => item.character !== '')
              .map((item) => item.character);
            return name.join(', ');
          })()}
        </Row>
      )}
    </Container>
  );
};

export default Information;
