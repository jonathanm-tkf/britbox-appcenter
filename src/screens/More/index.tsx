/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { View, Platform, Alert } from 'react-native';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import { Button } from '@components/Button';

// import { Container } from './styles';

const flex = {
  flex: 1,
  justifyContent: 'center',
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
  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;

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
    <>
      <View style={flex}>
        <Button
          onPress={() =>
            REAL_PRODUCT ? requestSubscription(PACKAGE_SUSCRIPTION) : requestPurchase(PACKAGE)
          }
        >
          Subscribe now
        </Button>
      </View>
    </>
  );
}
