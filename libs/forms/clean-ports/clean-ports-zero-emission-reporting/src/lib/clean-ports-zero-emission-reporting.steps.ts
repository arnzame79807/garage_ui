import { FormFlowStep } from '@garage/ui-lib';

export const CLEAN_PORTS_ZERO_EMISSION_REPORTING_STEPS: readonly FormFlowStep[] = [
  { key: 'project', label: 'Project', path: 'project' },
  { key: 'technology', label: 'Technology', path: 'technology' },
  { key: 'emissions', label: 'Emissions', path: 'emissions' },
  { key: 'review', label: 'Review', path: 'review' },
];
