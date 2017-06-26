import { NgModule } from '@angular/core';

import { COMPONENTS } from './components';
import { PIPES } from './pipes';
import { DIRECTIVES } from './directives';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,

    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
  ],
  providers: [
  ],
})
export class SharedModule {
}
