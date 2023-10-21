import { Label } from 'domain/entities/label';

export interface LabelsState {
  labels: Label[];
  labelsLoading: boolean;
}
