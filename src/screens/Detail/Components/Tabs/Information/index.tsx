import React from 'react';

import { Information as InformationDataType, MoreInformation } from '@src/services/detail';
import { useTranslation } from 'react-i18next';
import { getDuration } from '@src/utils/template';
import { DiscoverMoreIcon } from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Row,
  LabelBold,
  InformationButton,
  CreditsWrapper,
  CreditsList,
  CreditsText,
  CreditsItem,
} from './styles';

interface Props {
  data: InformationDataType;
  onLayout?: (event: any) => void;
  moreInformation: MoreInformation | undefined;
}

const Information = ({ data, onLayout, moreInformation }: Props) => {
  const { t } = useTranslation('layout');
  const { navigate } = useNavigation();

  const goToMoreInformation = () => {
    return navigate('ModalMoreInformation', { moreInformation });
  };

  return (
    <Container onLayout={onLayout}>
      {(data.type === 'movie' || data.type === 'episode') && (
        <InformationButton onPress={goToMoreInformation}>
          <DiscoverMoreIcon width={25} height={25} />
        </InformationButton>
      )}
      {(data?.customFields?.YearRange || data.releaseYear) && (
        <Row>
          <LabelBold>{t('years')}:</LabelBold>{' '}
          {data?.customFields?.YearRange || data?.releaseYear || ''}
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

      <CreditsWrapper>
        <LabelBold>{t('credits')}: </LabelBold>
        <CreditsList>
          {(data.credits || []).map((item, key) => {
            return (
              <CreditsItem key={key.toString()}>
                <CreditsText>{item.role === 'actor' ? item.character : item.role}</CreditsText>
                <CreditsText>
                  {item.role === 'director' || item.role === 'writer' ? item.name : item.name}
                </CreditsText>
              </CreditsItem>
            );
          })}
        </CreditsList>
      </CreditsWrapper>
    </Container>
  );
};

export default Information;
