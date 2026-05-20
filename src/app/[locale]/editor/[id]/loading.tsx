export default function EditorLoading() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Toolbar skeleton */}
      <div className="border-border bg-background flex animate-pulse items-center gap-3 border-b px-4 py-3">
        <div className="bg-muted h-4 w-4 rounded" />
        <div className="bg-border h-4 w-px" />
        <div className="bg-muted h-4 max-w-[200px] flex-1 rounded" />
        <div className="bg-muted h-7 w-20 rounded" />
        <div className="bg-muted h-7 w-24 rounded" />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-1">
        {/* Left panel skeleton */}
        <div className="border-border hidden w-[240px] space-y-3 border-r p-4 lg:block">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="bg-muted h-8 animate-pulse rounded"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {/* Center form skeleton */}
        <div className="border-border flex-1 animate-pulse space-y-6 border-r p-6">
          <div className="space-y-3">
            <div className="bg-muted h-3 w-24 rounded" />
            <div className="bg-muted h-10 rounded" />
          </div>
          <div className="space-y-3">
            <div className="bg-muted h-3 w-32 rounded" />
            <div className="bg-muted h-10 rounded" />
          </div>
          <div className="space-y-3">
            <div className="bg-muted h-3 w-20 rounded" />
            <div className="bg-muted h-24 rounded" />
          </div>
        </div>

        {/* Right preview skeleton */}
        <div className="hidden flex-1 bg-zinc-100 p-4 lg:block">
          <div className="mx-auto aspect-[210/297] max-w-md animate-pulse rounded bg-white shadow-lg">
            <div className="space-y-4 p-8">
              <div className="bg-muted h-6 w-48 rounded" />
              <div className="bg-muted h-3 w-32 rounded" />
              <div className="bg-muted mt-4 h-px" />
              <div className="mt-4 space-y-2">
                <div className="bg-muted h-3 w-full rounded" />
                <div className="bg-muted h-3 w-3/4 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
