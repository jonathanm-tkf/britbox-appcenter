declare module '*.jpg' {
  const jpg: string;
  export default jpg;
}

declare module '*.png' {
  const png: any;
  export default png;
}

// declare module "*.svg" {
//   const svg: string;
//   export default svg;
// }

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';

  const content: React.ComponentClass<SvgProps, any>;
  export default content;
}
