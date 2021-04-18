import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from './shared/classes/globals';
import { APIService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';
import { NavMenuEntity } from '../server/shared/entities/securityEntities';
import { Settings } from '../server/src/settings';
import { TheDb } from '../server/src/thedb';
import * as fs from 'fs';
import * as path from 'path';
import { Menu, MenuItemConstructorOptions, OpenDialogOptions, remote, OpenDialogSyncOptions, SaveDialogSyncOptions } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'BDO Visualiser';
  public isLoaded = false;
  public discordAuthToken: string = "";

  constructor(private apiService: APIService,
              public globals: Globals, 
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {

        Settings.initialize();

        if (fs.existsSync(Settings.dbPath)) {
            this.openDb(Settings.dbPath);
        } else if (Settings.hasFixedDbLocation) {
            this.createDb(Settings.dbPath);
        } else {
            this.createDb();
        }
        
  }

  public openDb(filename: string) {
    TheDb.openDb(filename)
        .then(() => {
            if (!Settings.hasFixedDbLocation) {
                Settings.dbPath = filename;
                Settings.write();
            }
        })
        .then(() => {
          this.loadApplication();
        })
        .catch((reason) => {
            // Handle errors
            console.log('Error occurred while opening database: ', reason);
        });
  }

  public async createDb(filename?: string) {
    if (!filename) {
        const options: SaveDialogSyncOptions = {
            title: 'Create file',
            defaultPath: remote.app.getPath('documents'),
            filters: [
                {
                    name: 'Database',
                    extensions: ['db'],
                },
            ],
        };
        filename = remote.dialog.showSaveDialogSync(remote.getCurrentWindow(), options);
    }

    if (!filename) {
        return;
    }

    TheDb.createDb(filename)
        .then((dbPath) => {
            if (!Settings.hasFixedDbLocation) {
                Settings.dbPath = dbPath;
                Settings.write();
            }
        })
        .then(() => {
          this.loadApplication();
        })
        .catch((reason) => {
            console.log(reason);
        });
  }

  public async loadApplication() {
    await this.apiService.loadConfigSettings();
    this.isLoaded = true;
    this.router.navigate(["combat"]);
  }
}
