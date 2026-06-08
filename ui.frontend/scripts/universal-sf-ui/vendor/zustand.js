import { createStore } from './zustand-vanilla.js';
import { useSyncExternalStore } from 'preact/compat';

const identity = (arg) => arg;

export function useStore(api, selector = identity) {
  const slice = useSyncExternalStore(
    api.subscribe,
    () => selector(api.getState()),
    () => selector(api.getInitialState())
  );
  return slice;
}

const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};

export const create = ((createState) => createState ? createImpl(createState) : createImpl);

// Export vanilla store functions
export * from './zustand-vanilla.js';
