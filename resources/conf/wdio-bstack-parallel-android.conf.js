var defaults = require("./wdio-bstack.conf.js");
var _ = require("lodash");

var overrides = {
  specs: [
    "./test/specs/android.pom.spec.js"
  ],
  services: [
    [ 'browserstack',
      {
        app: "Duke_App_Android",
        testObservability: true,
            testObservabilityOptions: {
                'projectName': 'Test Duke Energy POC Project',
                'buildName': 'duke-energy-poc-android-parallel-tests',
                'buildTag': 'appium wdio android'
            },
      },
    ],
  ],

  capabilities: [
    {
      maxInstances: 1,
      device: "Samsung Galaxy A51",
      os_version: "10.0",
      autoGrantPermissions: true,
      platformName: "Android",
      build: "duke-energy-poc-android-2"
    },
    {
      maxInstances: 1,
      device: "Samsung Galaxy S23",
      os_version: "13.0",
      autoGrantPermissions: true,
      platformName: "Android",
      build: "duke-energy-poc-android-2"
    },
    {
      maxInstances: 1,
      device: "Samsung Galaxy S23 Ultra",
      os_version: "13.0",
      autoGrantPermissions: true,
      platformName: "Android",
      build: "duke-energy-poc-android-2"
    },
    {
      maxInstances: 1,
      device: "Google Pixel 8",
      os_version: "14.0",
      autoGrantPermissions: true,
      platformName: "Android",
      build: "duke-energy-poc-android-2"
    },
    {
      maxInstances: 1,
      device: "Google Pixel 7 Pro",
      os_version: "13.0",
      autoGrantPermissions: true,
      platformName: "Android",
      build: "duke-energy-poc-android-2"
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;