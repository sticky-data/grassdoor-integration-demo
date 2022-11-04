import { GRASSDOOR_CART_ID } from '../helpers/grassdoor-cart';

// Hide widget UI
const GrassdoorCartWidget = () => (
	<div id={GRASSDOOR_CART_ID} style={{
		width: '100%',
		height: '100%',
		position: 'fixed',
		top: 0,
		left: 0,
		pointerEvents: 'none',
		opacity: 0
	}}/>
);
export default GrassdoorCartWidget;
