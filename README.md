# SNEX Connect React Widget

A little widget for connecting gamepads with SNEX for React. For more information on the controller API refer to the [SNEX Documentation](https://github.com/snex-io/snex-web/tree/master/docs).

<img src="http://imgur.com/G0XBL23.gif"/>

## Usage

* Install.
```bash
yarn add @snex/react-connect
```

* Require component.
```js
import SNEXConnect from '@snex/react-connect';
```

* Setup and render.
```jsx
// A dummy input receiver.
const myGame = new Game();

function handleControllerConnected(controller) {
  controller.on('data', data => {
    if (data.state && data.key === 'A') {
      myGame.hero.jump();
    }
  });
}

<SNEXConnect
  type='nes'
  onConnection={controller => handleControllerConnected(controller)}
/>
```

