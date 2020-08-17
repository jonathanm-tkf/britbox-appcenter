/* eslint-disable consistent-return */
export const getTemplate = (template: string) => {
  switch (template) {
    case '3:1 Hero (Standard)':
    case 'Hero (BBC)':
      return 'hero';
    case 'Hero Slim (BBC)':
      return 'hero-slim';
    case 'T1':
      return 'episodes';
    case 'T2':
      return 'large-programing';
    case 'P1':
      return 'standard';
    case 'P2':
      return 'popular';
    case 'Programme Carousel (BBC)':
    case 'Double Programme Carousel (BBC)':
    case '16:9 Tile (Hero)':
      return 'new';
    case 'S1':
      return 'collections';
    case 'S2':
      return 'genre';
    case '16:9 Tile (Reduced)':
      return 'title-treatment';
    default:
      break;
  }
};

export const getDuration = (duration: number) => {
  return Math.abs(Math.round(duration / 60));
};
