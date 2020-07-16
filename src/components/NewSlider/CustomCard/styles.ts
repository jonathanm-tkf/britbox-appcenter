import { StyleSheet, Dimensions, Platform } from 'react-native';
import { base, lightTheme } from '@store/modules/theme/theme';

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
