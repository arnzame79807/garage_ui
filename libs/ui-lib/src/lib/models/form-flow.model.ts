/** One step in a multi-page form flow. `path` is the child route segment. */
export interface FormFlowStep {
  key: string;
  label: string;
  path: string;
}
