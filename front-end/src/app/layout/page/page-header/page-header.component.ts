import { Component, Injector, Input, OnInit } from '@angular/core';
import { Theme } from '../../../shared/classes/config';
import { HeaderType } from '../enums/header-type';
import { BaseComponent } from '../../../shared/components/base.component';
import { PageService } from '../page.service';

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
  themes: any[];
  isLoaded: boolean;

  constructor(private injector: Injector,
    private pageService: PageService) {
    super(injector);
   }

  ngOnInit(): void {
    this.pageService.getThemes().subscribe( res => {
      this.themes = res as Array<Theme>;
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
    await this.pageService.saveProfile().then( res => {
      this.loader.stopBackground();
    },
    err => {
      this.loader.stopBackground();
      this.messageService.add({severity:'error', summary:'Error Saving', detail:'Server issue, cannot save settings at this time.', life: 2600 });
    }).finally(() => {
      this.messageService.add({severity:'success', summary:'Profile Updated', detail:'Your profile settings have been saved.', life: 1900 });
    });
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
