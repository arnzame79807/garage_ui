import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { FormFlowStep } from '../../models';

/**
 * Layout for a routed multi-step form: a step indicator plus a router outlet
 * for the active step. Generated form flows use this as their parent route.
 */
@Component({
  selector: 'garage-form-flow-shell',
  imports: [RouterOutlet, RouterLink],
  template: `
    <section class="flow">
      <header>
        <h1 class="title">{{ title() }}</h1>
        <p class="progress">Step {{ activeIndex() + 1 }} of {{ steps().length }}</p>
      </header>
      <ol class="steps" aria-label="Form steps">
        @for (step of steps(); track step.key; let i = $index) {
          <li
            class="step"
            [class.step--active]="i === activeIndex()"
            [class.step--done]="i < activeIndex()"
            [attr.aria-current]="i === activeIndex() ? 'step' : null"
          >
            @if (i < activeIndex()) {
              <a [routerLink]="step.path">{{ step.label }}</a>
            } @else {
              <span>{{ step.label }}</span>
            }
          </li>
        }
      </ol>
      <div class="body"><router-outlet /></div>
    </section>
  `,
  styleUrl: './form-flow-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFlowShellComponent {
  private readonly router = inject(Router);

  readonly title = input.required<string>();
  readonly steps = input.required<readonly FormFlowStep[]>();

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  readonly activeIndex = computed(() => {
    const path = this.url().split(/[?#]/)[0];
    const index = this.steps().findIndex((s) => path.endsWith(`/${s.path}`));
    return Math.max(index, 0);
  });
}
