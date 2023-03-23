import { NgModule } from '@angular/core';

//import { MenuItems } from './menu-items/menu-items';
import { CommonService } from './common/common.service';

import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';

@NgModule({
  declarations: [
    ToggleFullscreenDirective,
  
  ],
  exports: [

    ToggleFullscreenDirective
   ],
  providers: [ CommonService ]
})
export class SharedModule { }
