/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useCallback } from 'react';
import { View, Platform, Alert, Text, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ThemeState } from '@store/modules/theme/types';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import { Button } from '@components/Button';
import { Title } from '@components/Typography';
import { CelularIcon } from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@store/modules/user/actions';
import {
  ProfileView,
  RowContainer,
  RowContent,
  SubTitleLink,
  SeparatorLine,
  ItemTitle,
  ItemSubTitle,
  DescriptionText,
  RowViewContainer,
  ProfileImageIconView,
  EditIconContainer,
} from './styles';

// import { Container } from './styles';

const flex = {
  flex: 1,
  justifyContent: 'center',
};

const wrapper = {
  flex: 1,
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
  paddingHorizontal: 30,
};

const marginBottom = {
  marginBottom: Platform.OS === 'ios' ? 40 : 20,
};

const CelularStyle = {
  left: -10,
  opacity: 0.6,
};

interface Product {}

const REAL_PRODUCT = false;
const itemSkus = Platform.select({
  ios: [
    'com.britbox.us.staging.subscription',
    'com.britbox.us.staging.subscription.annual',
    'com.britbox.us.staging.subscription.annual.freetrial',
  ],
  android: REAL_PRODUCT
    ? [
        'com.britbox.us.staging.subscription',
        'com.britbox.us.staging.subscription.annual',
        'com.britbox.us.staging.subscription.annual.notrial',
      ]
    : [
        'android.test.purchased',
        'android.test.canceled',
        'android.test.refunded',
        'android.test.item_unavailable',
      ],
});

const PACKAGE = 'android.test.purchased';
const PACKAGE_SUSCRIPTION = 'com.britbox.us.staging.subscription';

const itemSubs = Platform.select({
  ios: [
    'com.britbox.us.staging.subscription',
    'com.britbox.us.staging.subscription.annual',
    'com.britbox.us.staging.subscription.annual.freetrial',
  ],
  android: REAL_PRODUCT
    ? [
        'com.britbox.us.staging.subscription',
        'com.britbox.us.staging.subscription.annual',
        'com.britbox.us.staging.subscription.annual.notrial',
      ]
    : [
        'android.test.purchased',
        'android.test.canceled',
        'android.test.refunded',
        'android.test.item_unavailable',
      ],
});

export default function More() {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;

  const logoutAction = () => dispatch(logout());

  const getProducts = async () => {
    // try {
    //   const result = await RNIap.initConnection();
    //   console.log('result', result);
    //   const products: Product[] = await RNIap.getSubscriptions(itemSkus || ['']);
    //   console.tron.log({ products });
    // } catch (err) {
    //   console.warn(err.code, err.message);
    // }

    // try {
    //   const result = await RNIap.initConnection();
    //   await RNIap.consumeAllItemsAndroid();
    //   console.tron.log('result', result);
    // } catch (err) {
    //   console.tron.log(err.code, err.message);
    // }

    try {
      const result = await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
      console.tron.log('result', result);
    } catch (err) {
      console.tron.log(err.code, err.message);
    }

    if (REAL_PRODUCT) {
      getSubscriptions();
    } else {
      getItems();
    }

    purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        const receipt = purchase.transactionReceipt;
        console.tron.log({ receipt });
        if (receipt) {
          try {
            // if (Platform.OS === 'ios') {
            //   finishTransactionIOS(purchase.transactionId);
            // } else if (Platform.OS === 'android') {
            //   // If consumable (can be purchased again)
            //   consumePurchaseAndroid(purchase.purchaseToken);
            //   // If not consumable
            //   acknowledgePurchaseAndroid(purchase.purchaseToken);
            // }
            const ackResult = await finishTransaction(purchase);
          } catch (ackErr) {
            console.tron.log('ackErr', ackErr);
          }

          goNext(receipt);
          // this.setState({receipt}, () => this.goNext());
        }
      }
    );

    purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
      console.tron.log('purchaseErrorListener', error);
      Alert.alert('purchase error', JSON.stringify(error));
    });
  };

  const goNext = (receipt: any): void => {
    Alert.alert('Receipt', receipt);
  };

  const getItems = async () => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      // const products = await RNIap.getSubscriptions(itemSkus);
      console.tron.log('Products', products);
      // this.setState({productList: products});
    } catch (err) {
      console.tron.log(err.code, err.message);
    }
  };

  const getSubscriptions = async () => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.tron.log('Products', products);
      // this.setState({productList: products});
    } catch (err) {
      console.tron.log(err.code, err.message);
    }
  };

  const getAvailablePurchases = async () => {
    try {
      console.tron.log('Get available purchases (non-consumable or unconsumed consumable)');
      const purchases = await RNIap.getAvailablePurchases();
      console.tron.log('Available purchases :: ', purchases);
      if (purchases && purchases.length > 0) {
        // this.setState({
        //   availableItemsMessage: `Got ${purchases.length} items.`,
        //   receipt: purchases[0].transactionReceipt,
        // });
      }
    } catch (err) {
      console.tron.log(err.code, err.message);
      Alert.alert(err.message);
    }
  };

  // Version 3 apis
  const requestPurchase = async (sku: string) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.tron.log(err.code, err.message);
    }
  };

  const requestSubscription = async (sku: string) => {
    try {
      RNIap.requestSubscription(sku);
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  // const requestPurchase = async (sku: string) => {
  //   try {
  //     await RNIap.requestPurchase(sku, false);
  //   } catch (err) {
  //     console.warn(err.code, err.message);
  //   }
  // };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={[wrapper, marginBottom]}>
      <ProfileView>
        <RowContainer>
          <ProfileImageIconView />
          <RowContent>
            <Title>{user?.profile?.firstName || ''}</Title>
            <RowViewContainer>
              <SubTitleLink>Manage Profile</SubTitleLink>
              <EditIconContainer />
            </RowViewContainer>
          </RowContent>
        </RowContainer>
      </ProfileView>
      <SeparatorLine />
      <RowContainer
        onPress={() => {
          navigate('MyAccount');
        }}
      >
        <RowContent>
          <ItemTitle>My Account</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <SeparatorLine />
      <RowContainer
        onPress={() => {
          navigate('ParentalControls');
        }}
      >
        <RowContent>
          <ItemTitle>Parental Controls</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <SeparatorLine />
      <RowContainer>
        <RowContent>
          <ItemTitle>Help</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <RowContainer>
        <RowContent>
          <ItemTitle>Terms & Conditions</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <RowContainer>
        <RowContent>
          <ItemTitle>Privacy Policy</ItemTitle>
        </RowContent>
        {/* <BackIcon height={20} width={20} /> */}
      </RowContainer>
      <SeparatorLine />
      <RowContainer>
        <CelularIcon height={60} width={50} style={CelularStyle} />
        <RowContent>
          <ItemSubTitle>APP Version</ItemSubTitle>
          <DescriptionText>Version: 7.52.0 build 19 (code 34567), OS</DescriptionText>
        </RowContent>
      </RowContainer>
      <SeparatorLine />
      <RowContainer>
        <RowContent>
          <TouchableOpacity onPress={() => logoutAction()}>
            <ItemTitle>Sign Out</ItemTitle>
          </TouchableOpacity>
        </RowContent>
      </RowContainer>
    </View>

    // <>
    //   <View style={flex}>
    //     <Button
    //       onPress={() =>
    //         REAL_PRODUCT ? requestSubscription(PACKAGE_SUSCRIPTION) : requestPurchase(PACKAGE)
    //       }
    //     >
    //       Subscribe now
    //     </Button>
    //   </View>
    // </>
  );
}
