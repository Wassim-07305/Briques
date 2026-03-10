export default function DemoLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse">
          <div className="h-5 w-5 rounded-md bg-primary/40" />
        </div>
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0ms]" />
          <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:150ms]" />
          <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
