import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { isNative } from '../helpers/utils';
import { GrassdoorCart } from '../helpers/grassdoor-cart';
import { StepProps } from '../pages';

const STEP = 1;

const StepInit = (props: StepProps) => {
	const { currentStep, onComplete } = props;
	const [ apiKey, setApiKey ] = useState('');
	const [ isLoading, setLoading ] = useState(false);
	const [ result, setResult ] = useState(null);
	const [ error, setError ] = useState(null);

	const onPressInitialize = async () => {
		setLoading(true);
		try {
			setResult(await GrassdoorCart.init({
				apiKey: apiKey,
				homeUrl: `https://staging.niceandsticky.com/menu/herbalize`
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
			<Text style={styles.title}>Step {STEP}: Initialize</Text>
			<Text style={styles.description}><Text style={styles.descriptionBold}>grassdoorCart.initialize</Text> is called using the API key provided in the text field below.{'\n\n'}Note: Native apps will fail in this step. <Text style={styles.descriptionBold}>{`<script/>`}</Text> tags don't exist in such environment.</Text>
			<TextInput style={styles.input} onChangeText={text => setApiKey(text)} placeholder={'API Key'} placeholderTextColor={'rgba(0, 0, 0, .38)'} value={apiKey}/>
			<TouchableOpacity style={styles.button} onPress={onPressInitialize}>
				<Text style={styles.buttonText}>{isLoading ? `Initializing...` : `Initialize`}</Text>
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
export default StepInit;

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
		fontWeight: '600'
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
		height: 48,
		color: 'rgba(0, 0, 0, .87)',
		fontSize: 16,
		fontWeight: '400',
		backgroundColor: 'white',
		borderRadius: 24,
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, .12)',
		outlineColor: 'rgb(19, 199, 205)',
		textAlign: 'center',
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
		fontFamily: !isNative() ? 'monospace' : undefined,
		fontSize: 16,
		fontWeight: '400',
		marginTop: 24
	}
});
