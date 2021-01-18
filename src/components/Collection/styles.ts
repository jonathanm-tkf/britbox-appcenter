import styled from 'styled-components/native';
import { ThemeProps } from '@store/modules/theme/types';
import type { Orientation } from '@src/utils/orientation';

type Align = 'left' | 'right';

export const List = styled.FlatList.attrs({
  keyExtractor: (_, index) => String(index),
})``;

type WrapperProps = {
  verticalMargin: number;
};

export const Wrapper = styled.View<WrapperProps>`
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  ${(props: WrapperProps) => `margin-vertical: ${props.verticalMargin}px;`}
`;

type ImageBackgroundProps = {
  height: number;
};

export const ImageBackground = styled.ImageBackground.attrs({
  blurRadius: 10,
})<ImageBackgroundProps>`
  width: 100%;
  position: absolute;
  opacity: 0.15;
  ${(props: ImageBackgroundProps) => `height: ${props.height}px;`}
`;

type SideWrapperProps = {
  align: Align;
  width: number;
};

export const SideWrapper = styled.View<SideWrapperProps>`
  ${(props: SideWrapperProps) => `width: ${props.width}%;`}
  ${(props: SideWrapperProps) => {
    return props.align === 'left'
      ? `
        align-items: center;
        padding-right: 30px;
      `
      : `
        align-items: flex-start;
        padding-left: 15px;
      `;
  }}
`;

type TitleProps = {
  readonly theme: ThemeProps;
  orientation: Orientation;
};

export const Title = styled.Text<TitleProps>`
  text-align: left;
  width: 80%;
  ${(props: TitleProps) => `color: ${props.theme.PRIMARY_FOREGROUND_COLOR};`}
  ${(props: DescriptionProps) =>
    props.orientation === 'LANDSCAPE'
      ? `
        font-size: 32px;
        line-height: 50px;
      `
      : `
        font-size: 26px;
        line-height: 40px;
      `}
`;

type DescriptionProps = {
  readonly theme: ThemeProps;
  orientation: Orientation;
};

export const Description = styled.Text<DescriptionProps>`
  flex-wrap: wrap;
  width: 80%;
  ${(props: DescriptionProps) => `color: ${props.theme.PRIMARY_FOREGROUND_COLOR}`}
  ${(props: DescriptionProps) =>
    props.orientation === 'LANDSCAPE'
      ? `
        font-size: 20px;
        lineHeight: 24px;
        padding-bottom: 40px;
      `
      : `
        font-size: 14px;
        lineHeight: 16px;
        padding-bottom: 25px;
      `}
`;

type ThumnailProps = {
  orientation: Orientation;
};

export const Thumnail = styled.Image<ThumnailProps>`
  border-radius: 8px;
  ${(props: ThumnailProps) => `width: ${props.width}%;`}
  ${(props: ThumnailProps) =>
    props.orientation === 'LANDSCAPE'
      ? `
        width: 60%
        aspect-ratio: 2;
      `
      : `
        width: 40%
        aspect-ratio: 1.2;
      `}
`;
