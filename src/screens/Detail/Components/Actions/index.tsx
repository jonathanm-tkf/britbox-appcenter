import React from 'react';
import { Dimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { LoadDetailPageResponse } from '@src/services/detail';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Shimmer from '@components/Shimmer';
import { WatchlistIcon } from '@assets/icons';
import Action from '@components/Action';
// import { getDuration } from '@src/utils/template';
import { useTranslation } from 'react-i18next';
import {
  Container,
  ActionWrapper,
  PreloadActions,
  ActionInnerContent,
  ActionButton,
  ActionInformation,
  ActionInformationWrapper,
  ActionText,
} from './styles';

const { width } = Dimensions.get('window');

type Props = {
  data: LoadDetailPageResponse | undefined;
};

const Actions = ({ data }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { t } = useTranslation(['layout']);

  return (
    <Container>
      <ActionWrapper>
        <Shimmer
          visible={!!data?.detail}
          shimmerComponent={() => (
            <PreloadActions>
              <ContentLoader
                speed={1}
                backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
                foregroundColor={theme.PRIMARY_COLOR}
              >
                <Rect x={width / 2 - 105 - 20} y="45" rx="8" ry="8" width="50" height="50" />
                <Rect x={width / 2 - 35 - 20} y="20" rx="8" ry="8" width="70" height="100" />
                <Rect x={width / 2 + 55 - 20} y="35" rx="8" ry="8" width="70" height="70" />
              </ContentLoader>
            </PreloadActions>
          )}
        >
          <ActionInnerContent>
            <ActionButton>
              <WatchlistIcon width={35} height={35} />
            </ActionButton>
            <ActionButton play>
              <Action isContinue={false} loop autoPlay width={80} height={80} />
              <ActionText>Play now</ActionText>
            </ActionButton>
            <ActionInformationWrapper>
              <ActionInformation>
                {data?.information.type === 'show' || data?.information.type === 'season'
                  ? data.show?.seasons?.size
                  : // : getDuration(item.duration || 0)
                    0}
              </ActionInformation>
              <ActionInformation>
                {data?.information.type === 'show' || data?.information.type === 'season'
                  ? Number(data.show?.seasons?.size || 0) > 1
                    ? t('seasons')
                    : t('season')
                  : t('min')}
              </ActionInformation>
            </ActionInformationWrapper>
          </ActionInnerContent>
        </Shimmer>
      </ActionWrapper>
    </Container>
  );
};

export default Actions;
