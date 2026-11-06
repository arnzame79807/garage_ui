import { FormFlowStep } from '@garage/ui-lib';

export const DERA_REPORTING_STEPS: readonly FormFlowStep[] = [
  { key: 'project', label: 'Project', path: 'project' },
  { key: 'vehicles', label: 'Vehicles', path: 'vehicles' },
  { key: 'costs', label: 'Costs', path: 'costs' },
  { key: 'review', label: 'Review', path: 'review' },
];
