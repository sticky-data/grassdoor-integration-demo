import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { isNative } from '../helpers/utils';
import { GrassdoorCart } from '../helpers/grassdoor-cart';
import { StepProps } from 'src/pages';

const PLACE_OBJECT = JSON.parse(`{"address_components":[{"long_name":"9134","short_name":"9134","types":["street_number"]},{"long_name":"Sepulveda Boulevard","short_name":"Sepulveda Blvd","types":["route"]},{"long_name":"North Hills","short_name":"North Hills","types":["neighborhood","political"]},{"long_name":"Los Angeles","short_name":"Los Angeles","types":["locality","political"]},{"long_name":"Los Angeles County","short_name":"Los Angeles County","types":["administrative_area_level_2","political"]},{"long_name":"California","short_name":"CA","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]},{"long_name":"91343","short_name":"91343","types":["postal_code"]},{"long_name":"3921","short_name":"3921","types":["postal_code_suffix"]}],"formatted_address":"9134 Sepulveda Blvd, North Hills, CA 91343, USA","geometry":{"location":{"lat":34.2365001,"lng":-118.4674741}},"place_id":"Ei85MTM0IFNlcHVsdmVkYSBCbHZkLCBOb3J0aCBIaWxscywgQ0EgOTEzNDMsIFVTQSIxEi8KFAoSCSmuGxi-kMKAEZrpwo5jQWu4EK5HKhQKEgmdntUWUJfCgBHOr705iT3omw","html_attributions":[]}`);
const STEP = 2;

const StepPlace = (props: StepProps) => {
	const { currentStep, onComplete } = props;
	const [ place, setPlace ] = useState(JSON.stringify(PLACE_OBJECT, undefined, 2));
	const [ isLoading, setLoading ] = useState(false);
	const [ result, setResult ] = useState(null);
	const [ error, setError ] = useState(null);

	const onPressSetDelivery = async () => {
		setLoading(true);
		try {
			setResult(await GrassdoorCart.setDeliveryDetails({
				place: JSON.parse(place)
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
			<Text style={styles.title}>Step {STEP}: Set delivery</Text>
			<Text style={styles.description}><Text style={styles.descriptionBold}>grassdoorCart.setDeliveryDetails</Text> is called using <Text style={styles.descriptionBold}>place_id</Text> and <Text style={styles.descriptionBold}>postcode</Text>.{'\n\n'}For simplicity, we extract those values out of the place object below in this demo:</Text>
			<TextInput style={styles.input} onChangeText={text => setPlace(text)} multiline={true} placeholder={'API Key'} placeholderTextColor={'rgba(0, 0, 0, .38)'} value={place}/>
			<TouchableOpacity style={styles.button} onPress={onPressSetDelivery}>
				<Text style={styles.buttonText}>{isLoading ? `Applying delivery...` : `Set delivery details`}</Text>
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
export default StepPlace;

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
