import { FormFlowStep } from '@garage/ui-lib';

export const CLEAN_PORTS_SCRAPPAGE_EVIDENCE_STEPS: readonly FormFlowStep[] = [
  { key: 'equipment', label: 'Equipment', path: 'equipment' },
  { key: 'scrappageEvidence', label: 'Scrappage Evidence', path: 'scrappage-evidence' },
  { key: 'review', label: 'Review', path: 'review' },
];
