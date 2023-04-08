import qsStringify from 'qs-stringify';
import type { DocWithErrors, Errors } from 'jsonapi-typescript';

export type ListResponse<Data> = {
  data: Data[],
  meta: {
    offset: number,
    pageSize: number,
    results: number,
    total: number,
  },
  included: Record<string, object[]>,
  links: {
    self: string,
    next?: string,
    prev?: string,
  },
}

class FetchError extends Error {
  response?: Response;

  errors?: Errors;
}

type FetchOptions = {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete',
  data?: object,
  qs?: Parameters<typeof qsStringify>[0],
  signal?: AbortSignal,
};
async function uwFetch<T = object>(args: [path: string, options?: FetchOptions] | string) {
  const path = typeof args === 'string' ? args : args[0];
  const options = (typeof args === 'string' ? undefined : args[1]) ?? {};

  const url = new URL(`/api${path}`, window.location.href);
  if (options.qs) {
    url.search = qsStringify(options.qs);
  }

  const response = await fetch(url, {
    method: options.method ?? 'get',
    body: options.data ? JSON.stringify(options.data) : undefined,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    signal: options.signal,
  });

  if (response.status !== 200) {
    const data = await response.json();
    if (!('errors' in data)) {
      throw new Error('An unknown error occurred.');
    }
    const { errors } = data as DocWithErrors;
    const error = new FetchError(errors.map((err) => err.title).join(', '));
    error.response = response;
    error.errors = errors;
    throw error;
  }

  const data = await response.json();

  return data as T;
}

export default uwFetch;
