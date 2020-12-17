import { EventsApi } from "../api/apis/EventsApi";
import { Configuration } from "../api/runtime";

const fetchApi: WindowOrWorkerGlobalScope['fetch'] = (input, init = {}) => fetch(input, {...init, keepalive: true});

export const client = new EventsApi(new Configuration({
  fetchApi
}));
