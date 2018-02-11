import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import 'rxjs/add/operator/shareReplay';
import { API_URL } from '../../app.tokens';

@Injectable()
export class ListProviderService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl,
    @Inject(DOCUMENT) private _document
  ) { }

  fetchData(path: string, body: any | null, options?: {}) {
    return this.http.post(`${this.apiUrl}${path}`, body, options).shareReplay();
  }

  overlayKeyframes(y, name: string) {
    const style = this._document.createElement('style');
    style.id = name;
    style.type = 'text/css';
    let keyframes = `
      @-webkit-keyframes ${name} {
        0% {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
        100% {
          -webkit-transform: translate3d(0, Y_VALUE, 0);
          transform: translate3d(0, Y_VALUE, 0);
        }
      }

      @keyframes ${name} {
        0% {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
        100% {
          -webkit-transform: translate3d(0, Y_VALUE, 0);
          transform: translate3d(0, Y_VALUE, 0);
        }
    }`;
    style.innerHTML = keyframes.replace(/Y_VALUE/g, y);
    this._getTargetElement('head').appendChild(style);
  }

  private _getTargetElement(tag: string) {
    return this._document.getElementsByTagName(tag)[0];
  }

  addPageClass(fullSrceen: boolean, bgImg?: string) {
    const html = this._getTargetElement('html');
    fullSrceen && (html.style.height = '100%');
    html.className = 'simulate-page';
    bgImg && (html.style['background-image'] = `url(${bgImg})`);
  }

  removePageClass() {
    const html = this._getTargetElement('html');
    html.style.height = '';
    html.style['background-image'] = '';
    html.className = '';
  }
}
