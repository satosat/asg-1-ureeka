import React, { useEffect, useState } from 'react';
import {
  Image, SafeAreaView, ScrollView, Text, View,
} from 'react-native';

export default function Home() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch('https://mustseeum.com/api/places/places_list');
      const json = await response.json();
      setPlaces(json.data);
    };
    sendRequest();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            justifyContent: 'center',

          }}
        />
        {places.map((place, key) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={key}
          >
            <Image
              style={{
                width: 370,
                height: 200,
                marginHorizontal: 'auto',
              }}
              source={{
                uri: place['place-thumb-image'],
              }}
            />
            {place['place-rating'] && (
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                paddingTop: 30,
                paddingRight: 30,
                paddingLeft: 30,

              }}
            >
              Rating:
              {' '}
              {place['place-rating'].slice(0, 3)}
            </Text>
            )}
            <Text
              style={{
                fontSize: 36,
                color: 'black',
                lineHeight: 48,
                paddingRight: 30,
                paddingLeft: 30,
              }}
            >
              {place['place-name']}
            </Text>
            <Text
              style={{
                paddingTop: 14,
                paddingRight: 30,
                paddingLeft: 30,
                color: 'black',
                fontSize: 16,
              }}
            >
              {place['place-address']}
            </Text>
            <Text
              style={{
                paddingTop: 15,
                paddingRight: 30,
                paddingLeft: 30,
                color: 'black',
                fontSize: 16,
                marginBottom: 40,
              }}
            >
              Opens
              {' '}
              {place['open-time'].slice(0, 5)}
              {' '}
              -
              {' '}
              {place['close-time'].slice(0, 5)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
