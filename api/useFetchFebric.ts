/**
 * This hook can be use to fetch febrics across the project
 * It has userId props to pass and will have more props such as page, filters, sorting states as well
 *
 *
 * **/
import { Reorder } from '@mui/icons-material';
import axios from 'axios';
import { APIS } from 'config/apis';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchedErrorAction,
  fetchedFebricsAction,
  fetchingFebricAction,
} from 'slices/febricsSlice';

interface IUseFebric {
  userId: string | string[] | undefined;
}
export default function useFetchFebrics({ userId }: IUseFebric) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFebricAPI = async () => {
      dispatch(fetchingFebricAction(true));
      try {
        const response = await axios.get(`${APIS.product}/${userId}`);
        dispatch(fetchedFebricsAction(response.data));
      } catch (err: any) {
        dispatch(fetchedErrorAction(err.response.message));
        console.error(err);
      }
      dispatch(fetchingFebricAction(false));
    };
    if(userId) fetchFebricAPI();
  }, [userId, dispatch]);


  return null;
}
