import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'Page',
    template: `
    <div class="page__bd" [ngClass]="{'page__bd_spacing': spacing}"><ng-content></ng-content></div>
    `,
    host: {
        'class': 'page'
    },
    styleUrls: [ './page.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class PageComponent {
    @Input() spacing: boolean = true;
}
