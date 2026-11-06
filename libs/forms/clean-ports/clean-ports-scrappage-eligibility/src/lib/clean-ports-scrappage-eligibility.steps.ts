import { FormFlowStep } from '@garage/ui-lib';

export const CLEAN_PORTS_SCRAPPAGE_ELIGIBILITY_STEPS: readonly FormFlowStep[] = [
  { key: 'applicant', label: 'Applicant', path: 'applicant' },
  { key: 'equipment', label: 'Equipment', path: 'equipment' },
  { key: 'review', label: 'Review', path: 'review' },
];
