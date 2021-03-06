## Gitlab pipeline data

Show pipeline data and variables using the gitlab token stored in the extension parameters

You can add it to Chrome from the [Chrome Web Store](https://chrome.google.com/webstore/detail/open-in-bundle-viewer/pjjocccheogfceldegkfnbfmobmblhpp). This also allows you to install it in the new Microsoft Edge.

You can add it to Firefox from the [Firefox add-on store](https://addons.mozilla.org/en-GB/firefox/addon/open-in-bundle-viewer/).

## Development

### Running in watch mode

```
npm install
npm run watch
```
This will output to the `distribution` folder, point the browser there for an 'unpacked' extension.

### Building a new release

```
npm install
npm run build
```

Zip the distribution folder and upload to the stores. Firefox also needs the source zip, which can be found on Github.

## License
Please see [LICENSE](https://github.com/OctoPrint/Open-in-Bundle-Viewer/blob/master/LICENSE) for license information.

Originally based on [browser-extension-template](https://github.com/fregante/browser-extension-template).
