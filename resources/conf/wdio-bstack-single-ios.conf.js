var defaults = require("./wdio-bstack.conf.js");
var _ = require("lodash");

var overrides = {
  specs: ["./test/specs/ios.spec.js"],
  services: [
    [ 'browserstack',
      {
        app: "Duke_App_iOS",
        testObservability: true,
            testObservabilityOptions: {
                'projectName': 'browserstack-examples-appium-webdriverio',
                'buildName': 'browserstack-examples-appium-webdriverio-ios',
                'buildTag': 'appium wdio'
            },
      },
    ],
  ],

  capabilities: [
    {
      maxInstances: 1,
      device: "iPhone14",
      os_version: "16.0",
      autoGrantPermissions: true,
      platformName: "iOS",
      build: "duke-energy-poc-android"
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;
