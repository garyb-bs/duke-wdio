var defaults = require("./wdio-bstack.conf.js");
var _ = require("lodash");

var overrides = {
  specs: [
    "./test/specs/android.pom.spec.js"
  ],
  services: [
    [ 'browserstack',
      {
        app: "Duke_App_iOS",
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
      device: "iPhone 14",
      os_version: "16",
      autoGrantPermissions: true,
      platformName: "iOS",
      build: "duke-energy-poc-ios"
    },
    {
      maxInstances: 1,
      device: "iPhone 13",
      os_version: "15",
      autoGrantPermissions: true,
      platformName: "iOS",
      build: "duke-energy-poc-ios"
    },
    {
      maxInstances: 1,
      device: "iPhone 14 Pro",
      os_version: "16",
      autoGrantPermissions: true,
      platformName: "iOS",
      build: "duke-energy-poc-ios"
    },
    {
      maxInstances: 1,
      device: "iPhone 14 Pro Max",
      os_version: "16",
      autoGrantPermissions: true,
      platformName: "iOS",
      build: "duke-energy-poc-ios"
    },
    {
      maxInstances: 1,
      device: "iPhone 15",
      os_version: "17",
      autoGrantPermissions: true,
      platformName: "iOS",
      build: "duke-energy-poc-ios"
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;