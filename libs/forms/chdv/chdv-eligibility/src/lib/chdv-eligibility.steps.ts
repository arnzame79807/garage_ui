import { FormFlowStep } from '@garage/ui-lib';

export const CHDV_ELIGIBILITY_STEPS: readonly FormFlowStep[] = [
  { key: 'applicant', label: 'Applicant', path: 'applicant' },
  { key: 'vehicles', label: 'Vehicles', path: 'vehicles' },
  { key: 'scrappage', label: 'Scrappage', path: 'scrappage' },
  { key: 'review', label: 'Review', path: 'review' },
];
