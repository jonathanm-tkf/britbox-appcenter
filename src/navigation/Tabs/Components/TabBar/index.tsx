import React from 'react';

import { NavigationState } from '@react-navigation/native';
import Cast from '@screens/Shared/Cast';
import { Container, Button, Label, WrapperIcon, CustomShadowTabBar, TabsWrapper } from './styles';

type Props = {
  state: NavigationState;
  navigation: any;
  descriptors: any;
};

const TabBar = ({ state, descriptors, navigation }: Props) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <TabsWrapper>
      <CustomShadowTabBar />
      <Cast />
      <Container>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Button
              key={index.toString()}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <WrapperIcon {...{ isFocused }}>{options.tabBarIcon()}</WrapperIcon>
              <Label {...{ isFocused }}>{label}</Label>
            </Button>
          );
        })}
      </Container>
    </TabsWrapper>
  );
};

export default TabBar;
