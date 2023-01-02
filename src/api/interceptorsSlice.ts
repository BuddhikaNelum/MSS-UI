import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, } from '@reduxjs/toolkit/query'
import config from 'configs/config';
import RouteRegistry from 'routes/route-registry';
import { getValue, removeValue } from 'utils/storage-util';

const token = getValue(process.env.REACT_APP_USER_SESSION!);

const baseQuery = fetchBaseQuery({
  baseUrl: config.api.baseUrl,
  prepareHeaders(headers) {
    headers.set('Authorization', `Bearer ${token}`)
    return headers;
  }
})

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // removeValue(process.env.REACT_APP_USER_INFO!)
    // removeValue(process.env.REACT_APP_USER_SESSION!)

    // if (window.location.pathname !== RouteRegistry.landing.path) {
    //   window.location.replace(RouteRegistry.landing.path)
    // }
  }

  return result
}