package com.britbox.us;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import android.annotation.SuppressLint;
import android.content.Context;
import android.app.Activity;
import android.util.Log;
import android.view.View;
import android.content.Intent;
import android.content.res.Configuration;
import com.facebook.react.GoogleCastActivity;

public class MainActivity extends GoogleCastActivity {

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Britbox";
  }

  class CustomReactActivityDelegate extends ReactActivityDelegate {
    class CustomReactRootView extends ReactRootView {
      public CustomReactRootView(Context context) {
        super(context);
      }
      @SuppressLint("LongLogTag")
      @Override
      public void onViewAdded(View child) {
        super.onViewAdded(child);
        Log.d("React views started to appear", "Static js code has already run");
      }
    }
    private Activity currentActivity;
    public CustomReactActivityDelegate(Activity activity, String mainComponentName) {
      super(activity, mainComponentName);
      currentActivity = activity;
    }
    protected ReactRootView createRootView() {
      return new CustomReactRootView(currentActivity);
    }
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
    @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
