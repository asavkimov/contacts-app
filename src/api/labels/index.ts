import { db } from 'config/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { Label } from 'domain/entities/label';
import { GetLabelsResponse } from './types';

class LabelsService {
  async getLabels(): Promise<GetLabelsResponse> {
    const q = query(collection(db, 'labels'));
    const response = await getDocs(q);

    return response.docs.map((label) => label.data() as Label);
  }
}

export default new LabelsService();
