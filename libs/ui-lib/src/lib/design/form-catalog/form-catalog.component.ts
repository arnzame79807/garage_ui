import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgramForm, ProgramFormKind } from '../../models';

export const FORM_KIND_LABELS: Record<ProgramFormKind, string> = {
  eligibility: 'Eligibility',
  evidence: 'Evidence',
  agreement: 'Agreement',
  reporting: 'Reporting',
};

/** List of program forms with their EPA number, type and availability. */
@Component({
  selector: 'garage-form-catalog',
  imports: [RouterLink],
  template: `
    <ul class="catalog">
      @for (form of forms(); track form.formNumber) {
        <li class="item">
          <span class="number">EPA {{ form.formNumber }}</span>
          <span class="title">
            @if (form.route) {
              <a [routerLink]="form.route">{{ form.title }}</a>
            } @else {
              {{ form.title }}
            }
          </span>
          <span class="kind kind--{{ form.kind }}">{{ labels[form.kind] }}</span>
          <span class="status">{{ form.route ? 'Available' : 'Coming soon' }}</span>
        </li>
      } @empty {
        <li class="empty">No forms yet.</li>
      }
    </ul>
  `,
  styles: `
    .catalog {
      display: grid;
      gap: var(--garage-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .item {
      display: grid;
      grid-template-columns: 8rem 1fr auto auto;
      align-items: center;
      gap: var(--garage-space-4);
      padding: var(--garage-space-3) var(--garage-space-4);
      border: 1px solid var(--garage-color-border);
      border-radius: var(--garage-radius-md);
      background: var(--garage-color-surface);
    }
    .number {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: var(--garage-font-size-sm);
      color: var(--garage-color-text-muted);
    }
    .title {
      font-weight: 600;
    }
    .kind {
      padding: var(--garage-space-1) var(--garage-space-2);
      border-radius: var(--garage-radius-pill);
      background: var(--garage-color-surface-sunken);
      font-size: var(--garage-font-size-sm);
    }
    .status {
      color: var(--garage-color-text-muted);
      font-size: var(--garage-font-size-sm);
    }
    @media (max-width: 40rem) {
      .item {
        grid-template-columns: 1fr auto;
      }
      .number,
      .status {
        grid-column: 1 / -1;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCatalogComponent {
  readonly forms = input.required<readonly ProgramForm[]>();
  protected readonly labels = FORM_KIND_LABELS;
}
