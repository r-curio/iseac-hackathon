"use client"; // Error boundaries must be Client Components

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    // global-error must include html and body tags
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <p className="text-5xl font-bold text-accent-200">Oops.</p>
      <p className="text-xl font-bold text-gray">
        Something went wrong. Try refreshing the page or come back later.
      </p>
      <button
        className="rounded-lg bg-primary px-6 py-3 text-white"
        onClick={reset}
      >
        Refresh Page
      </button>
      <p className="mt-24 font-mono text-lg text-gray">
        Error: <span className="font-bold text-red-400">{error.message}</span>
      </p>
    </div>
  );
};

export default ErrorPage;
