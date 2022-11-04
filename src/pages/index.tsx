import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Head from 'next/head';
import GrassdoorCartWidget from '../components/grassdoor-cart-widget';
import StepInit from '../components/step-init';
import StepPlace from '../components/step-place';
import StepCheckout from '../components/step-checkout';
import { useWindowDimensions } from '../helpers/use-window-dimensions';

export interface StepProps {
	currentStep: number
	onComplete?: () => void
}

const Home = () => {
	const [ currentStep, setCurrentStep ] = useState(1);
	const { height } = useWindowDimensions();
	const scrollRef = useRef<ScrollView>();

	useEffect(() => {
		scrollRef.current?.scrollToEnd({ animated: true });
	}, [ currentStep ]);

	return (
		<ScrollView style={[styles.root, { height }]} ref={scrollRef} contentContainerStyle={styles.container}>
			<Head>
				<title>Grassdoor - Integration Demo</title>
			</Head>
			<GrassdoorCartWidget/>
			<StepInit currentStep={currentStep} onComplete={() => setCurrentStep(2)}/>
			{ currentStep >= 2 ? <StepPlace currentStep={currentStep} onComplete={() => setCurrentStep(3)}/> : null }
			{ currentStep >= 3 ? <StepCheckout currentStep={currentStep}/> : null }
		</ScrollView>
	)
};
export default Home;
 
const styles = StyleSheet.create({
  root: {
		width: '100%',
    backgroundColor: '#fafafa'
  },
  container: {
		width: '100%',
		maxWidth: 800,
    alignItems: 'center',
		alignSelf: 'center',
    justifyContent: 'center',
		paddingTop: 96,
		paddingLeft: 24,
		paddingRight: 24,
		paddingBottom: 96
  }
});
