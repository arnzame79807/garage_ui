import { FormFlowStep } from '@garage/ui-lib';

export const CHDV_PROJECT_REPORTING_STEPS: readonly FormFlowStep[] = [
  { key: 'project', label: 'Project', path: 'project' },
  { key: 'vehicles', label: 'Vehicles', path: 'vehicles' },
  { key: 'infrastructure', label: 'Infrastructure', path: 'infrastructure' },
  { key: 'review', label: 'Review', path: 'review' },
];
