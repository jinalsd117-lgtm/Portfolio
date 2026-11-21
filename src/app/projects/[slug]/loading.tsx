export default function Loading() {
  return (
    <div className="container-page animate-pulse pt-12" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading case study…</span>
      <div className="h-4 w-48 rounded-full bg-line" />
      <div className="mt-8 h-12 w-3/4 rounded-2xl bg-line" />
      <div className="mt-4 h-5 w-1/2 rounded-full bg-line" />
      <div className="mt-10 aspect-[16/9] w-full rounded-[24px] bg-white ring-1 ring-line" />
      <div className="mt-10 grid gap-5 lg:grid-cols-12">
        <div className="h-48 rounded-[22px] bg-white ring-1 ring-line lg:col-span-5" />
        <div className="h-48 rounded-[22px] bg-white ring-1 ring-line lg:col-span-7" />
      </div>
    </div>
  );
}
