import { FormFlowStep } from '@garage/ui-lib';

export const DERA_ELIGIBILITY_STEPS: readonly FormFlowStep[] = [
  { key: 'applicant', label: 'Applicant', path: 'applicant' },
  { key: 'fleet', label: 'Fleet', path: 'fleet' },
  { key: 'review', label: 'Review', path: 'review' },
];
