import React from 'react';
import {useEffect, useCallback, useState} from 'react';
import {useIAP} from 'react-native-iap';
import {Platform, Button, StyleSheet, Text, View} from 'react-native';

const Purchase = () => {
  const {
    connected,
    products,
    promotedProductsIOS,
    subscriptions,
    purchaseHistories,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    initConnectionError,
    finishTransaction,
    getProducts,
    getSubscriptions,
    getAvailablePurchases,
    getPurchaseHistories,
    requestPurchase,
    requestSubscription,
  } = useIAP();

  const handlePurchase = async sku => {
    if (connected) {
      const purchase = await requestPurchase({sku});
      if (purchase) {
        finishTransaction({purchase});
      }
    }
  };

  const handleSubscription = async sku => {
    if (connected) {
      const subscription = await requestSubscription({sku});
      if (subscription) {
        finishTransaction({subscription});
      }
    }
  };

  useEffect(() => {
    // ... listen to currentPurchaseError, to check if any error happened
    console.log('CURRENT PURCHASE ERROR', currentPurchaseError);
  }, [currentPurchaseError]);

  useEffect(() => {
    // ... listen to currentPurchase, to check if the purchase went through
    console.log('CURRENT PURCHASE', currentPurchase);
  }, [currentPurchase]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Get the products"
        onPress={() => getProducts(['com.example.consumable'])}
      />

      {products.map(product => (
        <View key={product.productId}>
          <Text>{product.productId}</Text>

          <Button
            title="Buy"
            onPress={() => handlePurchase(product.productId)}
          />
        </View>
      ))}
    </View>
  );
};

export {Purchase};
