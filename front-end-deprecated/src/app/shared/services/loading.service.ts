import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class LoadingService {
    private loading: boolean = false;
    private opacityShow: boolean = false;
    private hasError: boolean = false;
    
    constructor(public loader: NgxUiLoaderService){

    }

    start(taskId?: string): void {
        this.loading = true;
        if(!!taskId && taskId != "") 
            this.loader.startLoader(taskId);
        else 
            this.loader.start();

        this.opacityShow = true;
        this.hasError = false;
    }

    isError(): boolean {
         return this.hasError;
    }

    stop(taskId?: string): void {
        if(!!taskId && taskId != "")
            this.loader.stopLoader(taskId);
        else
            this.loader.stop();

        this.loading = false;
        this.opacityShow = false;
        this.hasError = false;
    }

    startBackground(taskId?: string): void {
        this.loading = true;
        if(!!taskId && taskId != "") 
            this.loader.startBackground(taskId);
        else 
            this.loader.startBackground();

        this.opacityShow = true;
        this.hasError = false;
    }

    stopBackground(taskId?: string): void {
        if(!!taskId && taskId != "")
            this.loader.stopBackground(taskId);
        else
            this.loader.stopBackground();

        this.loading = false;
        this.opacityShow = false;
        this.hasError = false;
    }

    errorOccured(): void {
        this.loading = false;
        this.hasError = true;
    }
}