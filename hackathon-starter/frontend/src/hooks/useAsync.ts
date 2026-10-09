import { useCallback, useEffect, useState } from 'react';

interface AsyncState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Runs an async function and tracks loading / error / data, so every page
// handles those three states the same way. Call `reload` to run it again.
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({ data: null, error: null, loading: true });

  // `fn` is a new arrow function on every render, so it is memoised on `deps` instead.
  const run = useCallback(fn, deps);

  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      setState({ data: await run(), error: null, loading: false });
    } catch (err) {
      setState({ data: null, error: err instanceof Error ? err.message : 'Something went wrong', loading: false });
    }
  }, [run]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { ...state, reload };
}
