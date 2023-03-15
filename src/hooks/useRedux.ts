import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  useStore as useStoreBase,
  type TypedUseSelectorHook,
} from 'react-redux';
import configureStore, { StoreState } from '../redux/configureStore';

export const useDispatch = useDispatchBase<ReturnType<typeof configureStore>['dispatch']>;
export const useSelector: TypedUseSelectorHook<StoreState> = useSelectorBase;
export const useStore = useStoreBase<StoreState>;
