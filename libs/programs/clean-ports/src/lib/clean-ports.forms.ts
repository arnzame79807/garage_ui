import { ProgramForm } from '@garage/ui-lib';

/**
 * EPA forms for this program. `route` points at each form's online flow
 * (libs/forms/clean-ports/*); forms without one show as "Coming soon".
 */
export const CLEAN_PORTS_FORMS: readonly ProgramForm[] = [
  {
    formNumber: '5900-718',
    title: 'Clean Ports Scrappage Eligibility Statement',
    kind: 'eligibility',
    route: '/clean-ports/scrappage-eligibility',
  },
  {
    formNumber: '5900-684',
    title: 'Clean Ports Scrappage Evidence Statement',
    kind: 'evidence',
    route: '/clean-ports/scrappage-evidence',
  },
  {
    formNumber: '5900-719',
    title: 'Clean Ports Technology Deployment Evidence Statement',
    kind: 'evidence',
    route: '/clean-ports/technology-deployment',
  },
  {
    formNumber: '5900-720',
    title: 'Clean Ports Climate and Air Quality Planning Reporting Template',
    kind: 'reporting',
    route: '/clean-ports/climate-planning-reporting',
  },
  {
    formNumber: '5900-721',
    title: 'Clean Ports Zero Emission Technology Project Reporting Template',
    kind: 'reporting',
    route: '/clean-ports/zero-emission-reporting',
  },
];
