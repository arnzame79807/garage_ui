import { FormFlowStep } from '@garage/ui-lib';

export const CSB_ELIGIBILITY_STEPS: readonly FormFlowStep[] = [
  { key: 'applicant', label: 'Applicant', path: 'applicant' },
  { key: 'buses', label: 'Buses', path: 'buses' },
  { key: 'disposition', label: 'Disposition', path: 'disposition' },
  { key: 'review', label: 'Review', path: 'review' },
];
