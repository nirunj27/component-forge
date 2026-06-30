import { Hero } from "./components/Hero";
import { ComponentExplorer } from "./components/ComponentExplorer";
import { Button } from "@component-forge/app-ui/components/ui/button";

export function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚒️</span>
            <span className="font-semibold">Component Forge</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#explorer" className="text-sm text-muted-foreground hover:text-foreground">
              Explorer
            </a>
            <a href="http://localhost:5175" className="text-sm text-muted-foreground hover:text-foreground">
              Studio
            </a>
          </nav>
          <Button asChild size="sm">
            <a href="http://localhost:5175/register">Get started</a>
          </Button>
        </div>
      </header>

      <main>
        <Hero />
        <div className="bg-muted/40">
          <ComponentExplorer />
        </div>
        <footer className="border-t bg-slate-900 py-10 text-slate-400">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
            <p className="text-sm">Component Forge — schema-driven design system generator</p>
            <p className="text-sm">shadcn/ui + Tailwind + React 19</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
