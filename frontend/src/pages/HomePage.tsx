import { getGreeting } from '../api/hello';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { useAsync } from '../hooks/useAsync';

// Hello-world page: proves frontend -> backend -> database works end to end.
export default function HomePage() {
  const { data, error, loading, reload } = useAsync(() => getGreeting('world'));

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <section className="card">
      <h1>{data?.message}</h1>
      <p>Total visits recorded by the API: {data?.totalVisits}</p>
      <button onClick={reload}>Say hello again</button>
    </section>
  );
}
