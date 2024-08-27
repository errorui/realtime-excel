import Image from "next/image";
import CursorTracker from './components/CursorTracker';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CursorTracker></CursorTracker>
    </main>
  );
}
