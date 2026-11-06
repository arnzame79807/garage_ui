import { ProgramForm } from '@garage/ui-lib';

/**
 * EPA forms for this program. `route` points at each form's online flow
 * (libs/forms/chdv/*); forms without one show as "Coming soon".
 */
export const CHDV_FORMS: readonly ProgramForm[] = [
  {
    formNumber: '5900-682',
    title: 'CHDV Eligibility and Scrappage Statement',
    kind: 'eligibility',
    route: '/chdv/eligibility',
  },
  {
    formNumber: '5900-685',
    title: 'Utility Partnership Agreement',
    kind: 'agreement',
    route: '/chdv/utility-partnership',
  },
  {
    formNumber: '5900-683',
    title: 'CHDV Project Reporting Template',
    kind: 'reporting',
    route: '/chdv/project-reporting',
  },
];
