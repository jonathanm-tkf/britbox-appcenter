import { StyleSheet, Dimensions, Platform } from 'react-native';
import { base, lightTheme } from '@store/modules/theme/theme';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import { ThemeState } from '@store/modules/theme/types';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth } = Dimensions.get('window');

const wp = (percentage: number) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const slideHeight = 225;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(0);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  outerContainer: {
    padding: 0,
  },
  customShadow: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 3,
    borderRadius: 8,
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: lightTheme.PRIMARY_COLOR_OPAQUE,
    borderRadius: entryBorderRadius,
  },
  imageContainerEven: {},
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
  },
  radiusMaskEven: {},
  textContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 0,
    paddingHorizontal: 16,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
    zIndex: 2,
  },
  textContainerEven: {},
  title: {
    fontSize: 16,
    fontFamily: base.PRIMARY_FONT_FAMILY_MEDIUM,
    color: 'white',
  },
  titleEven: {},
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: 'white',
  },
  subtitleEven: {},
});

export const Gradient = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [rgba(props.theme.PRIMARY_COLOR, 0), props.theme.PRIMARY_COLOR],
}))`
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: -2px;
  z-index: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const LogoWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
