import styled from 'styled-components/native';

type Align = 'left' | 'right';

export const List = styled.FlatList.attrs({
  keyExtractor: (_, index) => String(index),
})``;

export const Wrapper = styled.View.attrs({
  zIndex: 1000,
})`
  flex-direction: row;
  align-items: center;
  margin-vertical: 40px;
  padding-left: 10px;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 300px;
  position: absolute;
  opacity: 0.1;
`;

type SideWrapperProps = {
  align: Align;
};

export const SideWrapper = styled.View<SideWrapperProps>`
  width: 40%;
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
  fontSize?: number;
  lineHeight?: number;
};

export const Title = styled.Text<TitleProps>`
  color: #fff;
  text-align: left;
  width: 80%;
  ${(props: TitleProps) =>
    props.fontSize &&
    `
      font-size: ${props.fontSize}px
    `}
  ${(props: TitleProps) =>
    props.lineHeight &&
    `
      line-height: ${props.lineHeight}px;
    `}
`;

type DescriptionProps = {
  fontSize?: number;
  lineHeight?: number;
};

export const Description = styled.Text<DescriptionProps>`
  color: #fff;
  flex-wrap: wrap;
  width: 80%;
  padding-bottom: 40px;
  ${(props: DescriptionProps) =>
    props.fontSize &&
    `
      font-size: ${props.fontSize}px
    `}
  ${(props: DescriptionProps) =>
    props.lineHeight &&
    `
      line-height: ${props.lineHeight}px;
    `}
`;

type ThumnailProps = {
  source: string;
};

export const Thumnail = styled.Image<ThumnailProps>`
  width: 60%;
  aspect-ratio: 2;
  border-radius: 8px;
`;
