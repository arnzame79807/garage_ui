import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, ButtonComponent, CardComponent } from '@garage/ui-lib';

@Component({
  selector: 'garage-home-page',
  imports: [RouterLink, ButtonComponent, CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly auth = inject(AuthService);

  protected readonly highlights = [
    { title: 'One place for your fleet', body: 'Track vehicles, applications and reporting deadlines together.' },
    { title: 'Guided forms', body: 'Step-by-step flows that save as you go and validate before you submit.' },
    { title: 'Secure by default', body: 'Multi-factor sign-in and session timeouts protect your data.' },
  ];
}
