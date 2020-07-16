import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';
import { SharedElement } from 'react-navigation-shared-element';
import { toggleTabs } from '@src/utils';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  listing: {
    marginBottom: 16,
  },
  image: {
    height: 150,
    width: width - 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    color: 'white',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    marginLeft: 4,
    color: 'white',
  },
  superhost: {
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    padding: 4,
    color: 'white',
  },
  superhostLabel: {
    fontSize: 10,
    color: 'white',
  },
});

export interface Listing {
  id: string;
  title: string;
  subtitle: string;
  picture: number;
  rating: number;
  ratingCount: number;
}

interface ListingProps {
  listing: Listing;
}

export default ({ listing }: ListingProps) => {
  const { navigate, dangerouslyGetParent } = useNavigation();
  const parent = dangerouslyGetParent();

  return (
    <View key={listing.id} style={styles.listing}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (parent) {
            toggleTabs(parent, false);
          }
          navigate('Listing', { listing });
        }}
      >
        <View>
          <SharedElement id={listing.id}>
            <Image style={styles.image} resizeMode="cover" source={listing.picture} />
          </SharedElement>
          <View style={styles.details}>
            <View style={styles.superhost}>
              <Text style={styles.superhostLabel}>SUPERHOST</Text>
            </View>
            <View style={styles.rating}>
              <Text style={styles.ratingLabel}>{`${listing.rating} (${listing.ratingCount})`}</Text>
            </View>
          </View>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.title}>{listing.subtitle}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
