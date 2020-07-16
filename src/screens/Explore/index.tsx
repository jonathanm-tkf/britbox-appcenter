import * as React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Listing } from '@components/index';
import { Listing as ListingModel } from '@components/Listing';
import Header from '@components/Header';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';

const listings: ListingModel[] = [
  // {
  //   id: 'tiny-home',
  //   title: 'Tiny Home',
  //   subtitle: 'Entire Flat · 1 Bed',
  //   picture: require('../../../assets/tiny-home.jpg'),
  //   rating: 4.93,
  //   ratingCount: 861,
  // },
  // {
  //   id: 'cook-house',
  //   title: 'Cook House',
  //   subtitle: 'Entire Flat · 1 Bed',
  //   picture: require('../../../assets/cook-house.jpg'),
  //   rating: 4.93,
  //   ratingCount: 861,
  // },
  // {
  //   id: 'tiny-home-2',
  //   title: 'Tiny Home 2',
  //   subtitle: 'Entire Flat · 2 Bed',
  //   picture: require('../../../assets/tiny-home.jpg'),
  //   rating: 4.93,
  //   ratingCount: 861,
  // },
  // {
  //   id: 'cook-house-2',
  //   title: 'Cook House 2',
  //   subtitle: 'Entire Flat · 2 Bed',
  //   picture: require('../../../assets/cook-house.jpg'),
  //   rating: 4.93,
  //   ratingCount: 861,
  // },
  // {
  //   id: 'tiny-home-3',
  //   title: 'Tiny Home 3',
  //   subtitle: 'Entire Flat · 3 Bed',
  //   picture: require('../../../assets/tiny-home.jpg'),
  //   rating: 4.93,
  //   ratingCount: 861,
  // },
  // {
  //   id: 'cook-house-3',
  //   title: 'Cook House 3',
  //   subtitle: 'Entire Flat · 3 Bed',
  //   picture: require('../../../assets/cook-house.jpg'),
  //   rating: 4.93,
  //   ratingCount: 861,
  // },
];

const wrapper = {
  flex: 1,
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
};

const marginBottom = {
  marginBottom: 60,
};

const Basic = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  return (
    <View style={wrapper}>
      <CollapsibleHeaderFlatList
        CollapsibleHeaderComponent={<Header />}
        headerContainerBackgroundColor={theme.PRIMARY_COLOR}
        headerHeight={77}
        data={[0]}
        renderItem={Item}
        clipHeader
        keyExtractor={keyExtractor}
        style={marginBottom}
      />
    </View>
  );
};

const keyExtractor = (item: number) => `${item}`;

const Item = () => (
  <View style={styles.container}>
    {listings.map((listing) => (
      <Listing key={listing.id} {...{ listing }} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  item: {
    paddingLeft: 20,
    paddingVertical: 20,
    backgroundColor: 'wheat',
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
  },
  header: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButton: {
    height: 94,
    width: 94,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#171b23',
    alignItems: 'center',
  },
});

export default Basic;

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Image,
//   Text,
//   Alert,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import { SharedElement } from 'react-navigation-shared-element';
// import { FlatList } from 'react-native-gesture-handler';

// const Scene1 = (props) => {
//   const { navigation } = props;

//   const items = [
//     {
//       id: '1',
//       image: require('../../assets/images/air-jordan-1.png'),
//     },
//     {
//       id: '2',
//       image: require('../../assets/images/air-jordan-1.png'),
//     },
//   ];

//   const Item = ({ item }: any) => {
//     console.log(item);
//     return (
//       <TouchableOpacity
//         activeOpacity={1}
//         style={{ backgroundColor: 'blue' }}
//         // onPress={() => navigation.navigate('screen2')}
//         onPress={() => navigation.push('Listing', { item })}
//       >
//         <SharedElement id={`item.${item.id}.photo`}>
//           <Image style={StylesLocal.shoe} source={item.image} />
//         </SharedElement>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={StylesLocal.container}>
//       <FlatList
//         horizontal
//         style={{ marginTop: 500 }}
//         data={items}
//         renderItem={({ item }) => <Item {...{ item }} />}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// const StylesLocal = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#C14534',
//     justifyContent: 'flex-end',
//   },
//   headerContainer: {
//     padding: 20,
//     paddingTop: Dimensions.get('window').height * 0.1,
//   },
//   header: {
//     color: '#FFF',
//     fontSize: 80,
//     marginBottom: -14,
//     fontFamily: 'Bebas Neue',
//   },
//   subheader: {
//     color: '#FFF',
//     fontSize: 34,
//     paddingTop: 10,
//     fontFamily: 'Bebas Neue',
//   },

//   shoe: {
//     width: 400,
//     height: 270,
//     zIndex: 1,
//   },
// });

// export default Scene1;

// import React from 'react';
// import { StyleSheet } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Header, Listing } from '@components/index';
// import { Listing as ListingModel } from '@components/Listing';

// const listings: ListingModel[] = [
//   {
//     id: 'tiny-home',
//     title: 'Tiny Home',
//     subtitle: 'Entire Flat · 1 Bed',
//     picture: require('../../../assets/tiny-home.jpg'),
//     rating: 4.93,
//     ratingCount: 861,
//   },
//   {
//     id: 'cook-house',
//     title: 'Cook House',
//     subtitle: 'Entire Flat · 1 Bed',
//     picture: require('../../../assets/cook-house.jpg'),
//     rating: 4.93,
//     ratingCount: 861,
//   },
// ];
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// const Explore = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />
//       {listings.map((listing) => (
//         <Listing key={listing.id} {...{ listing }} />
//       ))}
//     </SafeAreaView>
//   );
// };

// export default Explore;
