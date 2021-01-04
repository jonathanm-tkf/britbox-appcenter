#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
//#import <GoogleCast/GoogleCast.h>
#import <React/RCTLinkingManager.h>
//#import <AppCenterReactNative.h>
//#import <AppCenterReactNativeAnalytics.h>
//#import <AppCenterReactNativeCrashes.h>

// #import <UMCore/UMModuleRegistry.h>
// #import <UMReactNativeAdapter/UMNativeModulesProxy.h>
// #import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>
//#import <RNHomeIndicator.h>
//#import <EXScreenOrientation/EXScreenOrientationViewController.h>

//#ifdef FB_SONARKIT_ENABLED
//#import <FlipperKit/FlipperClient.h>
//#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
//#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
//#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
//#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
//#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
//
//static void InitializeFlipper(UIApplication *application) {
//  FlipperClient *client = [FlipperClient sharedClient];
//  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
//  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//  [client addPlugin:[FlipperKitReactPlugin new]];
//  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//  [client start];
//}
//#endif

// @interface AppDelegate () <RCTBridgeDelegate>

// @property (nonatomic, strong) UMModuleRegistryAdapter *moduleRegistryAdapter;

// @end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//#ifdef FB_SONARKIT_ENABLED
//  InitializeFlipper(application);
//#endif

  // self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Britbox"
                                            initialProperties:nil];

  rootView.backgroundColor = [UIColor colorWithRed: 0.09 green: 0.11 blue: 0.14 alpha: 1.00];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIViewController *rootViewController = [HomeIndicatorViewController new];
//  rootViewController.view = rootView;
//  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  UIStoryboard *sb = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
  UIViewController *vc = [sb instantiateInitialViewController];
  rootView.loadingView = vc.view;

//  GCKDiscoveryCriteria *criteria = [[GCKDiscoveryCriteria alloc] initWithApplicationID:@"FD8B89DB"];
//  GCKCastOptions* options = [[GCKCastOptions alloc] initWithDiscoveryCriteria:criteria];
//  options.physicalVolumeButtonsWillControlDeviceVolume = YES;
//  [GCKCastContext setSharedInstanceWithOptions:options];
//  GCKDiscoveryManager *discoverManager = [GCKDiscoveryManager alloc];
//  [discoverManager startDiscovery];
//  [GCKUICastButton appearance].tintColor = [UIColor grayColor];
//
//  [AppCenterReactNative register];
//  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
//  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];
  // [super application:application didFinishLaunchingWithOptions:launchOptions];

  return YES;
}

// - (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
// {
//     NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge];
//     // If you'd like to export some custom RCTBridgeModules that are not Expo modules, add them here!
//     return extraModules;
// }

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
#endif
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

@end
