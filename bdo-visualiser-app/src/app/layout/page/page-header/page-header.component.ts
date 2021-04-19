import { Component, Injector, Input, OnInit } from '@angular/core';
import { Theme } from '../../../shared/classes/config';
import { HeaderType } from '../enums/header-type';
import { BaseComponent } from '../../../shared/components/base.component';
import { PageService } from '../page.service';
import { ThemeViewModel } from 'src/server/shared/viewModels/securityViewModels';

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
  public themes: Array<Theme> = new Array<Theme>();
  public isLoaded: boolean = false;

  constructor(private injector: Injector,
    private pageService: PageService) {
    super(injector);
   }

  ngOnInit(): void {
    this.pageService.getThemes().catch((err: any) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to get themes.', life: 2600 });
    }).then((res: Array<ThemeViewModel>) => {
      console.log(res);
      this.themes = res;
      this.isLoaded = true;
    });
  }

  public toggleOptionsMenu() {
    if(this.showOptions)
      this.showOptions = false;
    else 
      this.showOptions = true;
  }

  public getSideTabId(id: number) {
    this.showSideOptions = true;
    this.sideOptionsId = id;
    this.showOptions = false;
  }

  public async saveSettings(): Promise<any> {
    this.loader.startBackground();
    // await this.pageService.saveProfile().then( res => {
    //   this.loader.stopBackground();
    // },
    // err => {
    //   this.loader.stopBackground();
    //   this.messageService.add({severity:'error', summary:'Error Saving', detail:'Server issue, cannot save settings at this time.', life: 2600 });
    // }).finally(() => {
    //   this.messageService.add({severity:'success', summary:'Profile Updated', detail:'Your profile settings have been saved.', life: 1900 });
    // });
  }

  public sideBarClosed() {
    this.showSideOptions = false;
    this.sideOptionsId = 0;
  }

  public closeDropdown() {
    if(this.showOptions)
      this.showOptions = false;
  }
}
