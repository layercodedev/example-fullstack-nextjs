export function ConnectionStatusIndicator({ status }: { status: string }) {
  return (
    <div className="justify-self-start flex items-center gap-2 bg-white dark:bg-gray-800 sm:px-3 p-1 rounded-full shadow-sm dark:shadow-gray-900/30">
      <div className={`w-3 h-3 rounded-full ${status === 'connected' ? 'bg-green-500' : status === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`} />
      <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
        {status === 'connected' ? 'Connected' : status === 'connecting' ? 'Connecting...' : status === 'error' ? 'Connection Error' : 'Disconnected'}
      </span>
    </div>
  );
}
