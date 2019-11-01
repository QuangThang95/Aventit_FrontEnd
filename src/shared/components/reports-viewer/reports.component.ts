import { Component, ViewChild, AfterViewInit, Renderer2, Input, ElementRef } from '@angular/core';
import * as ko from 'knockout';
import { Html } from 'devexpress-reporting';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements AfterViewInit {

  _viewerModel;

  @ViewChild('scripts')
  scripts: ElementRef;

  @ViewChild('control')
  control: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    const container = this.renderer.createElement('div');
    container.innerHTML = Html;

    this.renderer.appendChild(this.scripts.nativeElement, container);
    if (this._viewerModel) {
      const modelJson = ko.observable(JSON.stringify(this._viewerModel)),
        viewerModel = ko.observable(null);
      ko.applyBindings({
        report: this._viewerModel
      }, this.control.nativeElement);
    }
  }

  @Input()
  set viewerModel(viewerModel: any) {
    this._viewerModel = viewerModel;
  }
  get viewerModel() {
    return this._viewerModel;
  }
}
