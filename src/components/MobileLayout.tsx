import type { ReactNode } from 'react';

interface MobileLayoutProps {
  title: string;
  children: ReactNode;
}

const MobileLayout = ({ title, children }: MobileLayoutProps) => {
  return (
    <div className="mx-auto flex h-screen max-w-[400px] flex-col overflow-hidden rounded-lg border shadow-lg">
      <header className="shrink-0 bg-blue-600 p-4 text-center text-lg font-semibold text-white">
        {title}
      </header>
      <main className="flex-1 overflow-y-auto bg-white">{children}</main>
    </div>
  );
};

export default MobileLayout;
