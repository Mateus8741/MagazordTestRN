import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import {
  Logo,
  Screen,
  TextInput,
  useLocationSearch,
  useWeatherData,
} from '@shared';
import { Loading, SearchBox, WeatherView } from '@weatherComp';

export function WeatherHomeScreen() {
  const [show, setShow] = React.useState<boolean>(false);

  const variantType = 'weather';

  const { data, setCity } = useLocationSearch();

  const {
    data: weather,
    setSelectedCity,
    selectedCity,
    isFetching,
    isError,
  } = useWeatherData();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          'Erro',
          'Você está sem conexão com a internet ☹️, por favor verifique sua conexão e tente novamente',
          [
            {
              text: 'OK',
            },
          ],
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isError && selectedCity.name !== undefined) {
    return Alert.alert(
      'Erro',
      'Não foi possível buscar os dados da cidade selecionada',
      [
        {
          text: 'OK',
        },
      ],
    );
  }

  return (
    <Screen scrollable>
      <Logo appName="Weather" type={variantType} />

      <View className="px-5">
        <TextInput
          onAddTask={text => {
            setCity(text);
            setShow(true);
          }}
          placeholder="Faça uma busca..."
          iconName="search"
          type={variantType}
        />

        <SearchBox
          data={data?.data}
          onPress={item => {
            setSelectedCity(item);
            setShow(false);
          }}
          show={show}
        />
      </View>

      <View className="flex-1 px-5 justify-center items-center">
        {weather?.data === undefined ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl text-gray-500">Faça uma busca...</Text>
          </View>
        ) : isFetching ? (
          <Loading />
        ) : (
          <WeatherView data={weather?.data} />
        )}
      </View>
    </Screen>
  );
}
