import {AppDispatch, State} from '../../store/types';
import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';

export const useAppDispatch = () =>
  useDispatch<AppDispatch>();

export const useAppSelector:
  TypedUseSelectorHook<State> = useSelector;
