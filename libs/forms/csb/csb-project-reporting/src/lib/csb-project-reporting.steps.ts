import { FormFlowStep } from '@garage/ui-lib';

export const CSB_PROJECT_REPORTING_STEPS: readonly FormFlowStep[] = [
  { key: 'project', label: 'Project', path: 'project' },
  { key: 'buses', label: 'Buses', path: 'buses' },
  { key: 'infrastructure', label: 'Infrastructure', path: 'infrastructure' },
  { key: 'review', label: 'Review', path: 'review' },
];
