import { ProgramForm } from '@garage/ui-lib';

/**
 * EPA forms for this program. `route` points at each form's online flow
 * (libs/forms/csb/*); forms without one show as "Coming soon".
 */
export const CSB_FORMS: readonly ProgramForm[] = [
  {
    formNumber: '5900-686',
    title: 'CSB Eligibility and Scrap, Sell, Donate Statement',
    kind: 'eligibility',
    route: '/csb/eligibility',
  },
  {
    formNumber: '5900-693',
    title: 'CSB Electric Utility Partnership Agreement',
    kind: 'agreement',
    route: '/csb/utility-partnership',
  },
  {
    formNumber: '5900-692',
    title: 'CSB Project Reporting Template',
    kind: 'reporting',
    route: '/csb/project-reporting',
  },
];
