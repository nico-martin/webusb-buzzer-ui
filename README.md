# WebUSB Buzzer UI

A simple [WebUSB](https://developer.mozilla.org/en-US/docs/Web/API/USB) example that communicates with a [WebUSB Buzzer](https://github.com/nico-martin/webusb-buzzer) hardware device.  
It was developed using only typescript and no other build steps or frameworks.

## WebUSBController Class

The core of this sample application is a JavaScript class that abstracts the WebUSB API and concentrates it on a handful of methods:

```JavaScript
const Controller = new WebUSBController();

// Connect to a device, accepts USBDeviceRequestOptions as a parameter
Controller.connect({ filters: [{ vendorId: 0x2e8a }] });

// Send a DataView to the connected device
Controller.send(new Uint8Array([0, 255]));

// listener that accepts a callback function that runs whenever new data (DataView) is sent
Controller.onReceive((data) => console.log('received', data));

// listener that accepts a callback function that runs whenever a device is connected or disconnected
Controller.onDeviceConnect((device) =>
  console.log(device ? 'connect' : 'disconnect')
);
```

This class will also handle the auto-connection if a device has already been connected to your webapp.

## Build steps
In the `public/` folder you will find all the files and also the compiled JavaScript.

First of all you need to `npm install` the dependencies.

You can also compile it yourself using `npm run ts`.

It also comes with a dev server: `npm run serve-dev` (no auto-reload)