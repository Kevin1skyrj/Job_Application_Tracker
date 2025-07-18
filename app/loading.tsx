export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-muted rounded w-64" />
        <div className="h-10 bg-muted rounded w-32" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 bg-card rounded-lg border space-y-3">
            <div className="h-4 bg-muted rounded w-20" />
            <div className="h-8 bg-muted rounded w-12" />
            <div className="h-3 bg-muted rounded w-16" />
          </div>
        ))}
      </div>

      {/* Job Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-6 bg-muted rounded w-24" />
            <div className="space-y-3">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="p-4 bg-card rounded-lg border space-y-2">
                  <div className="h-4 bg-muted rounded w-32" />
                  <div className="h-3 bg-muted rounded w-24" />
                  <div className="h-3 bg-muted rounded w-20" />
                  <div className="h-2 bg-muted rounded w-16" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
