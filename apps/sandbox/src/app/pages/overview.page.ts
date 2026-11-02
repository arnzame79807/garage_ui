import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '@garage/ui-lib';
import { GUIDE_PAGES } from '../app.routes';

@Component({
  selector: 'garage-overview-page',
  imports: [RouterLink, CardComponent],
  template: `
    <h1>Garage design guide</h1>
    <p>
      Live reference for everything exported from <code>&#64;garage/ui-lib</code>. Components here
      are the real library code, so this page updates as the library does.
    </p>
    <div class="guide-section">
      @for (page of pages; track page.path) {
        <garage-card [heading]="page.label">
          <a [routerLink]="'/' + page.path">View {{ page.label.toLowerCase() }}</a>
        </garage-card>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewPage {
  protected readonly pages = GUIDE_PAGES;
}
