<h1 align="center">Grassdoor - Integration Demo</h1>

This demo is meant to showcase an extremely simplified integration using the same tech stack we use at Sticky.

## How to run

#### 1. Clone the repository

```bash
git clone https://github.com/sticky-data/grassdoor-integration-demo
```

#### 2. Install dependencies

```bash
yarn install
```

#### 3a. Run on a web browser

```bash
yarn dev:web
```

#### 3b. Run natively on a mobile device

```bash
yarn build:native && yarn start:native
```

You can open the native app using the **Expo Go** app or a simulator.

## Usage

Our implementation has been separated into 3 separate steps for the purposes of this demo:

1. Initialization
2. Set delivery details
3. Checkout

The demo UI will visually display what options have been passed down directly to `grassdoorCart`, as well as provide control over raw data being sent to it via input fields.

## Tech stack

This React project is powered by **NextJS** on the web. This allows us to pre-render pages, improving SEO and load times. Because we're using `react-native-web` for native compatibility, we avoid using browser-specific elements such as `<div>` whenever possible and use the native equivalent `<View>` instead.

It's possible to run this project on native devices and export into the App Store/Google Play thanks to **Expo** and **PilotJS**. Expo is a layer on top of **React Native** that enables automatic OTA updates bypassing the need to submit new builds to app stores, as well as conveniently test using the Expo Go app. **PilotJS** is the **NextJS**-equivalent for native. It acts as a compatibility layer that brings the same powerful NextJS features such as page routing, `_app` wrappers, and more.

## Issues with the cart widget on native

Most browser APIs do not exist on a native app environment. This includes `<script>` tags which the Grassdoor cart widget relies on. Because of it, this demo app will fail at the first step (`grassdoorCart.initialize`) on native devices.

## Why is the cart widget hidden?
It's extremely important to us that we maintain control over as much of the UI as possible. This includes the cart that users interface with. Maximum customizability is a must for us, therefore we use the Grassdoor cart widget as a proxy.

To do this, we simply render the widget in an invisible `<div>` that lives behind all other elements and is immune to pointer events. When the user checks out on our cart, we delegate `grassdoorCart` calls to the widget, synchronize our cart's items with it, and have it automatically trigger the checkout screen. This way, we can continue having full customizabilty over the user experience.
