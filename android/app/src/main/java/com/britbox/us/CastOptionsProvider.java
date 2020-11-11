package com.britbox.us;

import com.reactnative.googlecast.GoogleCastOptionsProvider;
import android.content.Context;
import com.google.android.gms.cast.framework.CastOptions;

public class CastOptionsProvider extends GoogleCastOptionsProvider {
  @Override
  public CastOptions getCastOptions(Context context) {
    CastOptions castOptions = new CastOptions.Builder()
        .setReceiverApplicationId(context.getString(R.string.app_id))
        .build();
    return castOptions;
  }
}
