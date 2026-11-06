import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { DeraScrappageData } from './dera-scrappage.model';
import { DERA_SCRAPPAGE_STEPS } from './dera-scrappage.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class DeraScrappageState extends FormFlowState<DeraScrappageData> {
  protected readonly stepKeys = DERA_SCRAPPAGE_STEPS.filter((s) => s.key !== 'review').map(
    (s) => s.key,
  );

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
