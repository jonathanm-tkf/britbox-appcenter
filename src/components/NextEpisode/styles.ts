import { Title as TitleC, Headline as HeadlineC } from '@components/Typography';
import styled from 'styled-components/native';
import ImageC from 'react-native-fast-image';
import { rgba } from 'polished';
import { ThemeState } from '../../store/modules/theme/types';

export const Container = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  max-width: 420px;
  width: 90%;
  border-radius: 5px;
  padding: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const Title = styled(TitleC)``;

export const Headline = styled(HeadlineC)`
  flex-shrink: 1;
  margin-bottom: 5px;
`;

export const Paragraph = styled.Text.attrs({
  numberOfLines: 4,
})`
  flex-shrink: 1;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  opacity: 0.6;
  font-size: 10px;
  line-height: 14px;
`;

export const Image = styled(ImageC)`
  width: 140px;
  height: 80px;
  border-radius: 5px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

export const WrapperContent = styled.View`
  flex: 1;
`;

export const NextButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const NextButtonText = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  margin-left: 15px;
`;

export const WrapperImage = styled.View`
  margin-right: 20px;
  align-items: center;
`;

export const WrapperCounter = styled.View`
  border-width: 2px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  position: absolute;
  margin-top: 24px;
  border-radius: 18px;
  width: 36px;
  height: 36px;
`;

export const BackgroundCounter = styled.View`
  margin: 4px;
  border-radius: 15px;
  width: 24px;
  height: 24px;
  padding: 2px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.6)};
`;

export const CounterText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-weight: 600;
`;
