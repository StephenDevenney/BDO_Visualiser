import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityController } from './routes/securityController';
import { CombatController } from './routes/combatController';
import { UserClassController } from './routes/userClassController';

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
      
    ],
    exports: [
      
    ],
    providers: [
      SecurityController,
      CombatController,
      UserClassController
    ]
  })
  export class ServerModule { 
    static forRoot(): ModuleWithProviders<ServerModule> {
      return {
        ngModule: ServerModule
      }
    }
  }