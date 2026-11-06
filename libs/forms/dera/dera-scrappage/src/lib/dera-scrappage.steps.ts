import { FormFlowStep } from '@garage/ui-lib';

export const DERA_SCRAPPAGE_STEPS: readonly FormFlowStep[] = [
  { key: 'vehicles', label: 'Vehicles', path: 'vehicles' },
  { key: 'scrappageEvidence', label: 'Scrappage Evidence', path: 'scrappage-evidence' },
  { key: 'review', label: 'Review', path: 'review' },
];
