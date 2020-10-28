//
//  AppleTVController.m
//  Britbox
//
//  Created by mac on 20/10/20.
//

#import "AppleTVController.h"
#import <VideoSubscriberAccount/VideoSubscriberAccount.h>

@interface AppleTVController ()

@end

@implementation AppleTVController

NSUserActivity *userActivity;

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

//UserActivity Methods
RCT_EXPORT_METHOD(userActivity:(NSString *)contentId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSString *bundleIdentifier = [[NSBundle mainBundle] bundleIdentifier];
    userActivity = [[NSUserActivity alloc]initWithActivityType:bundleIdentifier];
    //userActivity.title = @"User Activity";
    [userActivity setEligibleForSearch:true];
    if (@available(iOS 12.0, *)) {
      [userActivity setEligibleForPrediction:true];
      userActivity.persistentIdentifier = bundleIdentifier;
    }
    if (@available(iOS 13.0, *)) {
      userActivity.targetContentIdentifier = contentId;
    }
    self.view.userActivity = userActivity;
    [userActivity becomeCurrent];
    
    resolve(contentId);
  } @catch (NSError *e) {
    reject(nil, nil, e);
  }
}

RCT_EXPORT_METHOD(invalidUserActivity:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [userActivity invalidate];
    resolve(nil);
  } @catch (NSError *e) {
    reject(nil, nil, e);
  }
}

//Subscription Methods
RCT_EXPORT_METHOD(appleTVSubscription:(BOOL)isPaid resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    if (@available(iOS 11.0, *)) {
       VSSubscription *subscription = [[VSSubscription alloc]init];
       subscription.expirationDate = NSDate.distantFuture;
       VSSubscriptionRegistrationCenter *registrationCenter = [VSSubscriptionRegistrationCenter defaultSubscriptionRegistrationCenter];
       [registrationCenter setCurrentSubscription:subscription];
       [subscription setAccessLevel:isPaid];
    }
    resolve(nil);
  } @catch (NSError *e) {
    reject(nil, nil, e);
  }
}

RCT_EXPORT_METHOD(removeAppleTVSubscription:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    if (@available(iOS 11.0, *)) {
       VSSubscriptionRegistrationCenter *registrationCenter = [VSSubscriptionRegistrationCenter defaultSubscriptionRegistrationCenter];
       [registrationCenter setCurrentSubscription:nil];
    }
    resolve(nil);
  } @catch (NSError *e) {
    reject(nil, nil, e);
  }
}

//Now Playing Info Methods
RCT_EXPORT_METHOD(videoStart:(NSString *)contentId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(nil);
  } @catch (NSError *e) {
    reject(nil, nil, e);
  }
}
@end
