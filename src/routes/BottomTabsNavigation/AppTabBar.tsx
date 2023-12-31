import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useAppSafeArea, useShadowProps } from '@shared';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { AppTabBottomTabParamList } from './AppTabNavigator';
import { mapScreenToProps } from './mapScreenToProps';

export function AppTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { bottom } = useAppSafeArea();

  return (
    <View
      className="flex-row pt-3 bg-white dark:bg-gray-900"
      style={[{ paddingBottom: bottom }, useShadowProps()]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              params: route.params,
              merge: true,
            });
          }
        };

        const tabItem =
          mapScreenToProps[route.name as keyof AppTabBottomTabParamList];

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        function variantColor() {
          switch (tabItem.label) {
            case 'TodoApp':
              return 'blue';
            case 'WeatherApp':
              return 'orange';
            case 'StoreApp':
              return 'green';
            default:
              return 'blue';
          }
        }

        function variantClassName() {
          switch (tabItem.label) {
            case 'TodoApp':
              return 'text-blue-700';
            case 'WeatherApp':
              return 'text-orange-600';
            case 'StoreApp':
              return 'text-green-600';
            default:
              return 'text-blue-700';
          }
        }

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={1}
            className="items-center bg-white dark:bg-gray-900"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <FontAwesome
              color={isFocused ? variantColor() : '#7C7C7C'}
              name={isFocused ? tabItem.icon.focused : tabItem.icon.unfocused}
              size={20}
            />
            <Text
              className={`font-semiBold mt-1 text-sm text-center ${
                isFocused ? variantClassName() : 'text-gray-500'
              }`}>
              {tabItem.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
