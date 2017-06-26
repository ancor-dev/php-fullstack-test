import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SERVICES } from './services';

@NgModule({
  imports: [
  ],
  exports: [
  ],
  declarations: [
  ],
  providers: [
    ...SERVICES,
  ],
})
export class CoreModule {

  public constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
