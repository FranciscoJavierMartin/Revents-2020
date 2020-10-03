import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataFromSnapshot } from '../api/firestoreService';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../store/async/asyncActions';

export default function useFirestoreCollection({ query, data, deps }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());

    const unsubscribe = query().onSnapshot(
      (snapshot: any) => {
        const docs = snapshot.docs.map((doc: any) => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncActionFinish());
      },
      (error: any) => dispatch(asyncActionError(error))
    );

    return unsubscribe;
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
