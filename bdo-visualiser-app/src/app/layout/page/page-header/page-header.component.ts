import { Component, Injector, Input, OnInit } from '@angular/core';
import { Theme } from '../../../shared/classes/config';
import { HeaderType } from '../enums/header-type';
import { BaseComponent } from '../../../shared/components/base.component';
import { PageService } from '../page.service';
import { NavMenuViewModel, ThemeViewModel } from 'src/server/shared/viewModels/securityViewModels';
import { Title } from '@angular/platform-browser';
import { InputSwitch } from 'primeng/inputswitch';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent extends BaseComponent implements OnInit {

  @Input() pageTitle: string = "";
  @Input() subTitle1: string = "";
  @Input() subTitle2: string = "";
  @Input() pageHint: string = "";
  @Input() headerType: HeaderType = HeaderType.Short;
  @Input('showback') showBackButton: boolean = false;
  public showOptions: boolean = false;
  public showSideOptions: boolean = false;
  public sideOptionsId: number = 0;
  public themes: Array<ThemeViewModel> = new Array<ThemeViewModel>();
  public navToggle: boolean = false;
  public navigationMenu: Array<NavMenuViewModel> = new Array<NavMenuViewModel>();
  public navLoaded: boolean = false;
  public selectedThemeStatus: boolean = false;

  constructor(private injector: Injector,
    private pageService: PageService,
    private titleService: Title) {
    super(injector);
   }

  ngOnInit(): void {
    if(this.globals.config.theme.themeId == 1)
        this.selectedThemeStatus = true;

    this.pageService.getThemes().then((res: Array<ThemeViewModel>) => {
      this.themes = res;
    }).catch((err: any) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to get themes.', life: 2600 });
    });

    this.pageService.getNavMenu().then((res: Array<NavMenuViewModel>) => {
      this.navigationMenu = res;
      this.navLoaded = true;
    }).catch((err: any) => {
      // Log Error
    });
  }

  public changeTheme(e: InputSwitch) {
    if(e.checked)
      this.globals.config.theme = this.themes[0];
    else
      this.globals.config.theme = this.themes[1];

    this.saveSettings();
  }

  public async saveSettings(): Promise<void> {
    this.loader.start();
    this.pageService.saveConfigSettings().then(() => {
      this.loader.stop();
    }).catch((err: any) => {
      this.loader.stop();
    });
  }

  public async navToPage(navMenu: NavMenuViewModel) {
    if(navMenu.navRoute != "" || navMenu.navRoute != undefined)
      await this.router.navigate([navMenu.navRoute]).then(() => {
        this.titleService.setTitle(this.globals.config.hubName + " - " + navMenu.navName);
        this.globals.previousPageId = this.globals.currentPageId;
        this.globals.config.previousPage = navMenu;
        this.globals.currentPageId = navMenu.navMenuId;
      }).finally(() => {
        this.pageService.saveConfigSettings();
      });
  }
}
