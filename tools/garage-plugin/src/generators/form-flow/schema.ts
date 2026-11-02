export interface FormFlowGeneratorSchema {
  /** Flow name, e.g. "vehicle-registration". */
  name: string;
  /** Comma-separated data-entry steps, e.g. "owner,vehicle,documents". A review step is always appended. */
  steps?: string;
  /** Human-readable title shown above the stepper. Defaults to the name in Title Case. */
  title?: string;
  /** Parent folder for the new library. */
  directory?: string;
  /** App to register the route with ("" to skip). */
  app?: string;
  /** URL segment for the flow. Defaults to the kebab-case name. */
  route?: string;
  /** Put the flow behind authGuard. */
  guarded?: boolean;
  /** Also generate a Playwright spec in <app>-e2e. */
  e2e?: boolean;
  skipFormat?: boolean;
}
