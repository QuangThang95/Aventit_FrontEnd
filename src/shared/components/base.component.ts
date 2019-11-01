import { Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClassRightModel } from '../models/auth/class-right.model';

export abstract class BaseComponent {
    titlePage: string;
    protected permissions: ClassRightModel;
    private titleService: Title;

    public constructor(protected injector: Injector) {
        this.titleService = injector.get(Title);
    }

    public setTitle(newTitle?: string) {
        this.titleService.setTitle(newTitle || this.titlePage);
    }

    public getTitle(): string {
        return this.titleService.getTitle();
    }
}
