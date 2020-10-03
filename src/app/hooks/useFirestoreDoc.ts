import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataFromSnapshot } from '../api/firestore/firestoreService';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../store/async/asyncActions';

export default function useFirestoreDoc({
  query,
  data,
  deps,
  shouldExecute = true,
}: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldExecute) {
      dispatch(asyncActionStart());

      const unsubscribe = query().onSnapshot(
        (snapshot: any) => {
          if (!snapshot.exists) {
            dispatch(
              asyncActionError({
                code: 'not-found',
                message: 'Could not find document',
              })
            );
          } else {
            data(dataFromSnapshot(snapshot));
            dispatch(asyncActionFinish());
          }
        },
        (error: any) => dispatch(asyncActionError(error))
      );

      return unsubscribe;
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
