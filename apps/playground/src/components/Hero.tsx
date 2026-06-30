import { useEffect, useState } from "react";
import { Badge } from "@component-forge/app-ui/components/ui/badge";
import { Button } from "@component-forge/app-ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@component-forge/app-ui/components/ui/card";
import { api } from "../lib/api";

interface Developer {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface Stats {
  totalComponents: number;
  stableComponents: number;
  betaComponents: number;
  totalDevelopers?: number;
}

export function Hero() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    api
      .get<Stats | Stats[]>("/stats")
      .then((r) => setStats(Array.isArray(r.data) ? r.data[0]! : r.data))
      .catch(() => {});
    api
      .get<{ developers: Developer[] }>("/api/developers")
      .then((r) => setDevelopers(r.data.developers))
      .catch(() => {});
  }, []);

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
        <div className="space-y-6">
          <Badge className="bg-teal-600 hover:bg-teal-600">Open source design system</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Component Forge</h1>
          <p className="max-w-lg text-lg text-slate-300">
            Schema-driven React component generator for developer teams. Define once in YAML —
            ship typed components, tests, Storybook, and docs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="http://localhost:5175/register">Join as developer</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-600 bg-transparent text-white hover:bg-slate-800">
              <a href="#components">Explore components</a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-slate-300 hover:bg-slate-800 hover:text-white">
              <a href="http://localhost:5175">Open Studio</a>
            </Button>
          </div>
          {stats && (
            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
              {[
                { label: "Components", value: stats.totalComponents },
                { label: "Stable", value: stats.stableComponents },
                { label: "Developers", value: stats.totalDevelopers ?? developers.length },
                { label: "Tests", value: "16+" },
              ].map((s) => (
                <Card key={s.label} className="border-slate-700 bg-slate-800/50 text-white">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-slate-400">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Card className="border-slate-700 bg-slate-800/40 text-white">
          <CardHeader>
            <CardTitle>Forge developers</CardTitle>
            <CardDescription className="text-slate-400">
              Only registered developers can create components for this project.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {developers.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3">
                <span className="text-2xl">{d.avatar}</span>
                <div>
                  <p className="text-sm font-semibold">{d.name}</p>
                  <Badge variant="secondary" className="text-[10px] uppercase">
                    {d.role}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
