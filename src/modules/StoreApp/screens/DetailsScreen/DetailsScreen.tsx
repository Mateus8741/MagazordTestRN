import React from 'react';
import { Alert, Share, Text, View } from 'react-native';

import { Screen, customTransition, formatMoney, useAppSafeArea } from '@shared';
import { CustomButton, Header } from '@storeComp';
import Animated, { SlideInDown } from 'react-native-reanimated';

import { AppScreenProps } from '@routes';

export function DetailsScreen({
  route,
  navigation,
}: AppScreenProps<'DetailsScreen'>) {
  const { data } = route.params;

  const { top } = useAppSafeArea();

  const formatedMoney = formatMoney(data.price);

  function handleBuy() {
    Alert.alert('Comprar', 'Deseja confirmar a compra desse produto?', [
      {
        text: 'Confirmar',
        onPress: () => navigation.goBack(),
      },
      {
        text: 'Cancel',
        style: 'destructive',
        onPress: () => console.log('Cancel Pressed'),
      },
    ]);
  }

  function handleShare() {
    Share.share({
      title: data.title,
      message: data.description,
      url: data.image,
    });
  }

  return (
    <>
      <Header title="Store" goBack />

      <Screen scrollable>
        <View
          className="flex-1 bg-white dark:bg-gray-900 w-full px-5 overflow-hidden"
          style={{
            paddingTop: top,
          }}>
          <Animated.Image
            source={{ uri: data.image }}
            className="h-80 -m-5"
            sharedTransitionTag={`image-${data.image}`}
            sharedTransitionStyle={customTransition}
            resizeMode="contain"
          />

          <Animated.View
            className="flex-1 -mx-5 bg-gray-900 dark:bg-white rounded-t-3xl p-5"
            entering={SlideInDown.delay(300 * data.id)}>
            <View className="mb-3">
              <Text className="text-lg font-bold text-white dark:text-gray-900">
                {data.title}
              </Text>

              <Text className="text-base font-normal text-zinc-300 dark:text-zinc-700">
                {data.rating.rate} ⭐️
              </Text>
            </View>

            <Text className="text-base font-normal text-zinc-300 dark:text-zinc-700 mb-3">
              {data.description}
            </Text>

            <Text className="text-base font-normal text-zinc-300 dark:text-zinc-700">
              {formatedMoney} + impostos
            </Text>

            <View className="flex-row flex-1 justify-around items-center">
              <CustomButton title="Comprar" onPress={handleBuy} />
              <CustomButton title="Compartilhar" onPress={handleShare} />
            </View>
          </Animated.View>
        </View>
      </Screen>
    </>
  );
}
