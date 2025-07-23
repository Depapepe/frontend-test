import { Outlet, useMatches } from 'react-router';
const MobileLayout = () => {
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1] as { handle?: { title?: string } };
  const title = lastMatch?.handle?.title ?? '';
  return (
    <div className="mx-auto flex h-screen max-w-[400px] flex-col overflow-hidden rounded-lg border shadow-lg">
      <header className="shrink-0 bg-blue-600 p-4 text-center text-lg font-semibold text-white">
        {title}
      </header>
      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default MobileLayout;
