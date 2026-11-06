import { FormFlowStep } from '@garage/ui-lib';

export const CLEAN_PORTS_TECHNOLOGY_DEPLOYMENT_STEPS: readonly FormFlowStep[] = [
  { key: 'project', label: 'Project', path: 'project' },
  { key: 'technology', label: 'Technology', path: 'technology' },
  { key: 'deploymentEvidence', label: 'Deployment Evidence', path: 'deployment-evidence' },
  { key: 'review', label: 'Review', path: 'review' },
];
