import { ProgramForm } from '@garage/ui-lib';

/**
 * EPA forms for this program. `route` points at each form's online flow
 * (libs/forms/dera/*); forms without one show as "Coming soon".
 */
export const DERA_FORMS: readonly ProgramForm[] = [
  {
    formNumber: '5900-687',
    title: 'DERA Eligibility Statement',
    kind: 'eligibility',
    route: '/dera/eligibility',
  },
  {
    formNumber: '5900-688',
    title: 'DERA Scrappage Statement',
    kind: 'evidence',
    route: '/dera/scrappage',
  },
  {
    formNumber: '5900-691',
    title: 'DERA Reporting Template',
    kind: 'reporting',
    route: '/dera/reporting',
  },
];
