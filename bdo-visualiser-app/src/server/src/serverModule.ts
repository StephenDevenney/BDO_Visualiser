import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityController } from './routes/securityController';

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
      
    ],
    exports: [
      
    ],
    providers: [
      SecurityController
    ]
  })
  export class ServerModule { 
    static forRoot(): ModuleWithProviders<ServerModule> {
      return {
        ngModule: ServerModule
      }
    }
  }