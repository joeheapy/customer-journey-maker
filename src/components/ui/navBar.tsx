import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface NavBarProps {
  Tokens: number;
  error?: string | null;
  onReset: () => void;
}

export function NavBar({ Tokens, error, onReset }: NavBarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-2 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Customer Journey Maker</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Tokens:</span>
            <span className="font-semibold">{Tokens}</span>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
          <button
            onClick={onReset}
            className="px-2 py-1 text-sm text-foreground bg-foreground/40 hover:bg-foreground/20 rounded transition-colors"
          >
            Reset Tokens
          </button>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
