import APIConfig from '../config/api.config';

export type Return<T = Record<string, any>> = {
  statusCode: number;
  message: string;
} & Partial<T>;

function buildUrl(url: string, query?: Record<string, any>) {
  const u = new URL(url, (APIConfig.https ? 'https' : 'http') + '://' + APIConfig.host + ':' + APIConfig.port);
  u.search = '?' + (new URLSearchParams(query)).toString();
  return u;
}

export async function query(url: string, options: {
  method?: 'GET'|'POST',
  query?: Record<string, any>,
  body?: string | FormData | URLSearchParams | Record<string, string>,
  headers?: Headers | Record<string, string> | [string, string][],
  jwt?: string | boolean
} = {}): Promise<Return> {
  const u = buildUrl(url, options.query).toString();
  const headers = new Headers(options.headers);
  if (options.jwt) {
    if (typeof options.jwt === 'string') {
      headers.append('Authorization', 'Bearer ' + options.jwt);
    } else {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        return {
          statusCode: 401,
          message: 'You have no jwt!'
        }
      }
      headers.append('Authorization', 'Bearer ' + jwt);
    }
  }
  let body: string | FormData | URLSearchParams | undefined;
  if (options.body) {
    if (options.body instanceof FormData || options.body instanceof URLSearchParams || typeof options.body === 'string') {
      body = options.body;
    } else {
      body = new URLSearchParams(options.body);
    }
  }
  const res = await fetch(u, {
    method: options.method ?? 'GET',
    body,
    headers,
    mode: APIConfig.cors ? 'cors' : 'same-origin',
  });
  const json = await res.json() as Record<string, any>;
  return {
    statusCode: Number(json?.statusCode) ?? res.status,
    message: String(json?.error ?? json?.message ?? res.statusText),
    ...json
  };
}
