export const getTemplate = (template: string, isCollection?: boolean) => {
  switch (template) {
    case '3:1 Hero (Standard)':
    case 'Hero (BBC)':
      return 'hero';
    case 'Hero Slim (BBC)':
      return 'hero-slim';
    case 'Continue Watching (BBC)':
      return 'user-watching';
    case 'T1':
    case '16:9 Tile (Reduced)':
      return 'episodes';
    case 'T2':
      return 'large-programing';
    case 'P1':
      return 'standard';
    case 'P2':
      return 'popular';
    case 'Programme Carousel (BBC)':
    case 'Double Programme Carousel (BBC)':
    case '16:9 Tile (Hero)': {
      if (isCollection) {
        return 'episodes';
      }
      return 'new';
    }
    case 'S1':
      return 'collections';
    case 'S2':
      return 'genre';
    case 'Pictorial Navigation (BBC)':
      return 'title-treatment';
    case 'Programme Grid (BBC)':
      return 'grid';
    case '16:9 Tile (Continuous Scroll)':
    case 'Continuous Scroll Automatic':
      return 'grid-infinite';
    case 'Our Favourites (BBC)':
      return 'our-favorites';
    default:
      return '';
  }
};

export const getIsCollectionDetail = (template: string) => {
  return template === 'Collection (BBC)';
};

export const getIsListDetail = (template: string) => {
  return template === 'List Page';
};

export const getIsOurFavoritesMultiple = (items: number) => {
  return items > 1;
};

export const getDuration = (duration: number) => {
  return Math.abs(Math.round(duration / 60));
};
