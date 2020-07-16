import { useNavigation } from 'react-navigation-hooks';

export const toggleTabs = (parent: ReturnType<typeof useNavigation>, value: boolean) => {
  parent.dangerouslyGetParent()?.setParams({ showTabs: value });
};
