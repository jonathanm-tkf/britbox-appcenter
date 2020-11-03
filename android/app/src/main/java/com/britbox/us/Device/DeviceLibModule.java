package com.britbox.us.Device;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

public class DeviceLibModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;
  private String DEVICE_SCREEN_ON = "DEVICE_SCREEN_ON";
  private String DEVICE_SCREEN_OFF = "DEVICE_SCREEN_OFF";

  BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
    //When Event is published, onReceive method is called
    @Override
    public void onReceive(Context context, Intent intent) {
      if(intent.getAction().equals(Intent.ACTION_SCREEN_ON)){
        reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(DEVICE_SCREEN_ON, null);
        Log.i("[BroadcastReceiver]", "Screen ON");
      }
      else if(intent.getAction().equals(Intent.ACTION_SCREEN_OFF)){
        reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(DEVICE_SCREEN_OFF, null);
        Log.i("[BroadcastReceiver]", "Screen OFF");
      }
    }
  };

  //constructor
  public DeviceLibModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContext.registerReceiver(broadcastReceiver, new IntentFilter(Intent.ACTION_SCREEN_ON));
    reactContext.registerReceiver(broadcastReceiver, new IntentFilter(Intent.ACTION_SCREEN_OFF));
  }

  //Mandatory function getName that specifies the module name
  @Override
  public String getName() {
    return "Device";
  }
}
