var defaults = require("./wdio-bstack.conf.js");
var _ = require("lodash");

var overrides = {
  specs: ["./test/specs/android.pom.spec.js"],
  services: [
    [ 'browserstack',
      {
        app: "Duke_App_Android",
        testObservability: true,
            testObservabilityOptions: {
                'projectName': 'Duke Energy POC Project',
                'buildName': 'duke-energy-poc-android-tests',
                'buildTag': 'appium wdio android'
            },
      },
    ],
  ],

  capabilities: [
    {
      maxInstances: 1,
      device: "Samsung Galaxy S23",
      os_version: "13.0",
      autoGrantPermissions: true,
      platformName: "Android",
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
