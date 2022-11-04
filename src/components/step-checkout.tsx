import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { isNative } from '../helpers/utils';
import { GrassdoorCart } from '../helpers/grassdoor-cart';
import { StepProps } from 'src/pages';

// These products work:
const PRODUCT_75622 = JSON.parse(`{ "id": 75622, "sortCatId": 2975, "slug": "pineapple-gummies", "theme": { "foregroundColor": "#666ccd", "backgroundColor": "#f3efa1" }, "baseUrl": "https://d1qw0m5jrhedk8.cloudfront.net/", "imagePath": "all_products/original/1bb073d8d672f04ff3c015c79fedcbdf.jpg", "productImage": "https://d1qw0m5jrhedk8.cloudfront.net/all_products/original/1bb073d8d672f04ff3c015c79fedcbdf.jpg", "allFullShopCategoryName": "Edibles,Tinctures", "scheduleIsSoldOut": false, "startDateTime": null, "endDateTime": null, "isDealAvailable": false, "isPremium": 0, "isOunce": 0, "logoImageUrl": "https://d1qw0m5jrhedk8.cloudfront.net/www.niceandsticky.com/category/logo/", "dealPriceType": 0, "productShortDescription": null, "premiumProductPrice": 0, "offerProduct": [], "productAttributes": [ { "name": "THC PER PACK", "value": "10" } ], "concentratedWeightOriginal": 0.1, "nonConcentratedWeightOriginal": 0, "type": "product", "mappingId": 476, "isSoldOut": false, "listPrice": 15, "salePrice": 15, "employeeLimitExceeded": 0, "menu": "both", "brand": { "name": "Jelly Cannabis Co.", "slug": "jelly-cannabis" }, "name": "Pineapple Gummies", "currency": "$", "weight": 100, "unit": "mg", "strainTypeName": "Hybrid", "maxQuantity": 10000, "effects": null, "aromaAndFlavors": null, "secondaryAttributes": [ "gummies" ], "chemicalContents": { "concentrateUnit": "g", "nonConcentrateUnit": "g", "concentrateContent": 0.1, "nonConcentrateContent": 0 }, "volumeDiscount": [] }`);
const PRODUCT_76085 = JSON.parse(`{ "id": 76085, "sortCatId": 2984, "slug": "relief-1-1-pomegranate", "theme": { "foregroundColor": "#666ccd", "backgroundColor": "#f3efa1" }, "baseUrl": "https://d1qw0m5jrhedk8.cloudfront.net/", "imagePath": "all_products/original/8653a6c47fe8f84a753281aa40658243.jpg", "productImage": "https://d1qw0m5jrhedk8.cloudfront.net/all_products/original/8653a6c47fe8f84a753281aa40658243.jpg", "allFullShopCategoryName": "Edibles,Wellness", "scheduleIsSoldOut": false, "startDateTime": null, "endDateTime": null, "isDealAvailable": false, "isPremium": 0, "isOunce": 0, "logoImageUrl": "https://d1qw0m5jrhedk8.cloudfront.net/www.niceandsticky.com/category/logo/", "dealPriceType": 0, "productShortDescription": null, "premiumProductPrice": 0, "offerProduct": [], "productAttributes": [ { "name": "CBD PER SERVING", "value": "5" }, { "name": "THC PER SERVING", "value": "5" }, { "name": "CBD PER PACK", "value": "100" }, { "name": "THC PER PACK", "value": "100" } ], "concentratedWeightOriginal": 0.1, "nonConcentratedWeightOriginal": 0, "type": "product", "mappingId": 2389, "isSoldOut": false, "listPrice": 25, "salePrice": 25, "employeeLimitExceeded": 0, "menu": "schedule", "brand": { "name": "PLUS", "slug": "PLUS" }, "name": "Relief 1:1 Pomegranate", "currency": "$", "weight": 100, "unit": "mg", "strainTypeName": "CBD:THC", "maxQuantity": 10000, "effects": null, "aromaAndFlavors": null, "secondaryAttributes": [ "gummies" ], "chemicalContents": { "concentrateUnit": "g", "nonConcentrateUnit": "g", "concentrateContent": 0.1, "nonConcentrateContent": 0 }, "volumeDiscount": [] }`);

// These other products don't work:
const PRODUCT_75592 = JSON.parse(`{ "id": 75592, "sortCatId": 2948, "slug": "3-bears-kush-unrefined-live-resin-cartridge-1g", "theme": { "foregroundColor": "#666ccd", "backgroundColor": "#f3efa1" }, "baseUrl": "https://d1qw0m5jrhedk8.cloudfront.net/", "imagePath": "all_products/original/6235aa13265cbeea27f87af84a124c1f.jpg", "productImage": "https://d1qw0m5jrhedk8.cloudfront.net/all_products/original/6235aa13265cbeea27f87af84a124c1f.jpg", "allFullShopCategoryName": "Vape", "scheduleIsSoldOut": false, "startDateTime": null, "endDateTime": null, "isDealAvailable": false, "isPremium": 0, "isOunce": 0, "logoImageUrl": "https://d1qw0m5jrhedk8.cloudfront.net/www.niceandsticky.com/category/logo/", "dealPriceType": 0, "productShortDescription": null, "premiumProductPrice": 0, "offerProduct": [], "productAttributes": [ { "name": "THC", "value": "79,83" } ], "concentratedWeightOriginal": 1, "nonConcentratedWeightOriginal": 0, "type": "product", "mappingId": 120, "isSoldOut": false, "listPrice": 55, "salePrice": 55, "employeeLimitExceeded": 0, "menu": "schedule", "brand": { "name": "Jetty Extracts", "slug": "jetty-extracts" }, "name": "3 Bears Kush UNREFINED Live Resin Cartridge 1g", "currency": "$", "weight": 1, "unit": "gram", "strainTypeName": "Indica", "maxQuantity": 10000, "effects": null, "aromaAndFlavors": null, "secondaryAttributes": null, "chemicalContents": { "concentrateUnit": "g", "nonConcentrateUnit": "g", "concentrateContent": 1, "nonConcentrateContent": 0 }, "volumeDiscount": [] }`);
const PRODUCT_76091 = JSON.parse(`{ "id": 76091, "sortCatId": 2975, "slug": "unwind-concord-grape", "theme": { "foregroundColor": "#666ccd", "backgroundColor": "#f3efa1" }, "baseUrl": "https://d1qw0m5jrhedk8.cloudfront.net/", "imagePath": "all_products/original/342f8dd2d257b15d3f5296d056a0b82d.jpg", "productImage": "https://d1qw0m5jrhedk8.cloudfront.net/all_products/original/342f8dd2d257b15d3f5296d056a0b82d.jpg", "allFullShopCategoryName": "Edibles", "scheduleIsSoldOut": false, "startDateTime": null, "endDateTime": null, "isDealAvailable": false, "isPremium": 0, "isOunce": 0, "logoImageUrl": "https://d1qw0m5jrhedk8.cloudfront.net/www.niceandsticky.com/category/logo/", "dealPriceType": 0, "productShortDescription": null, "premiumProductPrice": 0, "offerProduct": [], "productAttributes": [ { "name": "THC PER SERVING", "value": "4.5" }, { "name": "CBD PER SERVING", "value": "0.5" }, { "name": "THC PER PACK", "value": "90" }, { "name": "CBD PER PACK", "value": "10" } ], "concentratedWeightOriginal": 0.1, "nonConcentratedWeightOriginal": 0, "type": "product", "mappingId": 2392, "isSoldOut": false, "listPrice": 18, "salePrice": 18, "employeeLimitExceeded": 0, "menu": "schedule", "brand": { "name": "PLUS", "slug": "PLUS" }, "name": "Unwind Concord Grape", "currency": "$", "weight": 100, "unit": "mg", "strainTypeName": "Hybrid", "maxQuantity": 10000, "effects": null, "aromaAndFlavors": null, "secondaryAttributes": [ "gummies" ], "chemicalContents": { "concentrateUnit": "g", "nonConcentrateUnit": "g", "concentrateContent": 0.1, "nonConcentrateContent": 0 }, "volumeDiscount": [] }`);

const PRODUCTS_PARTIAL_WORKING = [PRODUCT_75592, PRODUCT_75622, PRODUCT_76091, PRODUCT_76085];
const PRODUCTS_BROKEN = [PRODUCT_75592, PRODUCT_76091];

const STEP = 3;

const StepCheckout = (props: StepProps) => {
	const { currentStep, onComplete } = props;
	const [ products, setProducts ] = useState(JSON.stringify(PRODUCTS_BROKEN, undefined, 2));
	const [ isLoading, setLoading ] = useState(false);
	const [ result, setResult ] = useState(null);
	const [ error, setError ] = useState(null);

	const onPressSetDelivery = async () => {
		setLoading(true);
		try {
			setResult(await GrassdoorCart.sync({
				grassdoorProducts: JSON.parse(products),
				openCheckout: true
			}));
			onComplete?.();
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={[styles.root, { opacity: currentStep === STEP ? 1 : .5}]}>
			<Text style={styles.title}>Step {STEP}: Checkout</Text>
			<Text style={styles.description}>Products are added one by one using <Text style={styles.descriptionBold}>grassdoorCart.addProductToCart</Text>.{'\n\n'}Outside of this demo, we actually clear the Grassdoor cart and synchronize with our own.{'\n\n'}This is an extremely simplified version using the hardcoded product data below:</Text>
			<TextInput style={styles.input} onChangeText={text => setProducts(text)} multiline={true} placeholder={'API Key'} placeholderTextColor={'rgba(0, 0, 0, .38)'} value={products}/>
			<TouchableOpacity style={styles.button} onPress={onPressSetDelivery}>
				<Text style={styles.buttonText}>{isLoading ? `Checking out...` : `Checkout`}</Text>
			</TouchableOpacity>
			{ result || error
				? <>
						<Text style={styles.description}>{result ? `Successfully called with options:` : `Failed with error:`}</Text>
						<TextInput style={[styles.result, {
							backgroundColor: result ? 'rgba(19, 199, 205, .06)' : 'rgba(244, 67, 54, .06)',
							borderColor: result ? 'rgb(19, 199, 205)' : 'rgb(244, 67, 54)',
						}]} editable={false} multiline={true} value={JSON.stringify(result || error.message, undefined, 2)}/>
					</>
				: null
			}
		</View>
	)
};
export default StepCheckout;

const styles = StyleSheet.create({
	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		color: 'rgba(0, 0, 0, .87)',
		fontSize: 24,
		fontWeight: '600',
		marginTop: 48
	},
	description: {
		color: 'rgba(0, 0, 0, .54)',
		fontSize: 16,
		fontWeight: '400',
		textAlign: 'center',
		marginTop: 24
	},
	descriptionBold: {
		color: 'rgba(0, 0, 0, .87)',
		fontFamily: !isNative() ? 'monospace' : undefined,
		fontSize: 16,
		fontWeight: '600'
	},
	input: {
		width: '100%',
		height: 200,
		color: 'rgba(0, 0, 0, .87)',
		fontSize: 16,
		fontWeight: '400',
		backgroundColor: 'white',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, .12)',
		outlineColor: 'rgb(19, 199, 205)',
		fontFamily: !isNative() ? 'monospace' : undefined,
		marginTop: 24
	},
	button: {
		width: '100%',
		height: 48,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: 'rgb(19, 199, 205)',
		borderRadius: 24,
		paddingLeft: 16,
		paddingRight: 16,
		marginTop: 24
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600'
	},
	result: {
		width: '100%',
		height: 200,
		borderRadius: 8,
		borderWidth: 2,
		color: 'black',
		fontSize: 16,
		fontWeight: '400',
		marginTop: 24
	}
});
