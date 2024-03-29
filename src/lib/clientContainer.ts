import { EventsApi } from "../api/apis/EventsApi";
import { Configuration, ConfigurationParameters } from "../api/runtime";

export interface ClientContainer {
  setConfig: (config?: ConfigurationParameters | undefined) => void;
  client: EventsApi | undefined;
}

const fetchApi: WindowOrWorkerGlobalScope['fetch'] = (input, init = {}) =>
  fetch(input, {...init, keepalive: true, credentials: 'include'});

export const makeClientContainer = () => {

  const container: ClientContainer = {
    client: undefined,
    setConfig: (config) => {
      container.client = new EventsApi(new Configuration({
        fetchApi,
        ...(config ? config : {})
      }));
    }
  };

  return container;
};
