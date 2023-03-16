import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  useStore as useStoreBase,
  type TypedUseSelectorHook,
} from 'react-redux';
import { AppDispatch, StoreState } from '../redux/configureStore';

export const useDispatch = useDispatchBase<AppDispatch>;
export const useSelector: TypedUseSelectorHook<StoreState> = useSelectorBase;
export const useStore = useStoreBase<StoreState>;
