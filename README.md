# SNEX React Widget

A React widget for connecting SNEX gamepads. 

[Watch an intro to SNEX](https://www.youtube.com/watch?v=M0Zpn2V_xac "JS Gamepad API over Air")




When this widget exist in your application any user can connect to your web app with a gamepad by going to the URL shown.

The widget will keep track of link lifetime according to what the SNEX API reports. After the link expires the widget will go back to showing the SNEX logo and a new session can be requested by clicking again.

![Widget Demo](http://i.imgur.com/WSnTxFt.gif "Widget demo")

For more information on the controller API refer to the [SNEX Documentation](https://github.com/snex-io/snex-web/tree/master/docs).

## Examples

* Minimal Example
  https://codesandbox.io/s/snex-example-8jnh2r
  
* Multiple Connections
  https://codesandbox.io/s/snex-multi-connection-example-pdqog9

## Usage

### [Watch Video](https://www.youtube.com/watch?v=xFt6IpxaQ-w) on YouTube.


### Install.
```bash
yarn add @snex/react-connect
```

### Require component.
```js
import SNEX from '@snex/react-connect';
```

### Render.

Wire up SNEX with the `onConnection` property to receive remotes and listen to the `data` event of remotes.

```jsx
class MyComponent extends React.Component {
  handleConnection = (controller) => {
    controller.on('data', data => {
      if (data.state && data.key === 'A') {
        this.props.game.hero.jump();
      }
    });
  }

  render() {
    return <div>
      <SNEX
        type='nes'
        onConnection={this.handleConnection}
      />
    </div>;
  }
}
```

## Props
### `onConnection` *Function* (required)
Function to call everytime a controller is connected. The function will have the connecting controller as argument. To listen for input from controller attach a listener to the `data` event.
```jsx
<SNEX onConnection={controller => {
    controller.on('data', data => {
        console.log('Controller sent', data);
    });
}}/>
```

### `type` *String* (optional)
Controller type to create URL for like `nes`, `snes`, or `genesis`. Default to `nes`. For a full list of controllers refer to the [SNEX Documentation](https://docs.snex.io/).
