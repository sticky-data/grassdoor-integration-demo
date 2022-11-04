const GRASSDOOR_API_URL = 'https://api.grassdoor.com/api/v3';
export const GRASSDOOR_CART_ID = 'grassdoor-cart';
const STICKY_CHECKOUT_URL = 'https://checkout.niceandsticky.com/checkout';

// @ts-ignore
export const _grassdoorCart = (): any => grassdoorCart; // Alias to silence TypeScript warnings

interface AddProductOptions {
	grassdoorProduct: any
	openCheckout?: boolean
}
const addProduct = async (options: AddProductOptions) => {
	const { grassdoorProduct, openCheckout } = options;

	if (openCheckout) {
		await _grassdoorCart().buyProductNow({
			type: 'product',
			mappingId: grassdoorProduct.id,
			...grassdoorProduct
		});
	} else {
		await _grassdoorCart().addProductToCart({
			type: 'product',
			mappingId: grassdoorProduct.id,
			...grassdoorProduct
		});
	}
};

const checkout = async () => {
	await _grassdoorCart().checkout();
};

interface ClearOptions {
	grassdoorProducts: any[]
}
const clear = async (options: ClearOptions) => {
	const { grassdoorProducts } = options;

	for (const grassdoorProduct of grassdoorProducts) {
		await _grassdoorCart().updateProductCount(grassdoorProduct.id, 0, false);
	}
};

interface InitOptions {
	apiKey: string
	apiUrl?: string
	checkoutUrl?: string
	elementId?: string
	hideCartOnUpdate?: boolean
	homeUrl?: string | false
}
const init = async (options: InitOptions) => {
	const {
		apiKey,
		apiUrl = GRASSDOOR_API_URL,
		checkoutUrl = STICKY_CHECKOUT_URL,
		elementId = GRASSDOOR_CART_ID,
		hideCartOnUpdate = true,
		homeUrl
	} = options;

	const initOptions = {
		checkoutUrl: checkoutUrl,
		hideCartOnUpdate: hideCartOnUpdate,
		homeUrl: homeUrl,
		id: elementId,
		url: apiUrl,
		x_api_key: apiKey
	};
	await _grassdoorCart().initialize(initOptions);

	return initOptions;
};

interface SetDeliveryDetailsOptions {
	place: any
}
const setDeliveryDetails = async (options: SetDeliveryDetailsOptions) => {
	const { place } = options;
	const postalCode = place.address_components?.find((component: any) => component.types.includes('postal_code'))?.long_name;

	const deliveryOptions = {
		place_id: place.place_id,
		postcode: postalCode
	};
	await _grassdoorCart().setDeliveryDetails(deliveryOptions, 2);

	return deliveryOptions;
};

const show = () => {
	_grassdoorCart().showCart()
};

interface SyncOptions {
	grassdoorProducts: any[]
	openCheckout?: boolean
}
const sync = async (options: SyncOptions) => {
	const { grassdoorProducts, openCheckout } = options;

	await clear({ grassdoorProducts });
	for (const grassdoorProduct of grassdoorProducts) {
		await addProduct({ grassdoorProduct });
	}

	if (openCheckout) {
		await checkout();
	}
};

export const GrassdoorCart = {
	addProduct, checkout, clear, init, setDeliveryDetails, show, sync
};
