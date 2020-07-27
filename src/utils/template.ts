/* eslint-disable consistent-return */
export const getTemplate = (template: string) => {
  switch (template) {
    case 'Programme Carousel (BBC)':
      return 'episodes';
    default:
      break;
  }
};
