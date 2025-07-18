import { useState, type ComponentType, useMemo, lazy, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  TypeOutline,
  RefreshCw,
  BookOpenText,
} from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "react-router-dom";
import { toggleFont } from "@/lib/utils";
import { getRandomMoodImporter } from "@/components/moods";

type MoodImporter = () => Promise<{ default: ComponentType<any> }>;

export default function Home() {
  const [moodImporter, setMoodImporter] = useState<MoodImporter>(() =>
    getRandomMoodImporter()
  );

  const CurrentMood = useMemo(() => lazy(moodImporter), [moodImporter]);

  const refreshMood = () => {
    setMoodImporter((prev) => getRandomMoodImporter(prev));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-12 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-3xl font-bold mb-2">c01in</h1>
            <span className="sr-only">Colin Lyu</span>
            <p className="text-muted-foreground">
              Engineer · Builder · Minimalist
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link onClick={refreshMood} to="#">
                <RefreshCw />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/kb">
                <BookOpenText />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mb-12 w-full">
        <Suspense
          fallback={
            <div className="w-full h-48 bg-muted rounded-lg animate-pulse" />
          }
        >
          <CurrentMood />
        </Suspense>
      </section>

      <section className="space-y-6 w-full">
        <Project
          name="AotianOS"
          description="A lightweight empathetic AI framework for reflective conversations."
        />
        <Project
          name="BotBoats"
          description="A lightweight, offline-first AI assistant platform featuring customizable characters, local chat history, and support for your own API keys — all packed in a PWA you can run anywhere."
          link="https://botboats.pages.dev"
          github="https://github.com/colinhebe/botboats"
        />
        <Project
          name="Rhymove"
          description="A music-enhanced fitness timer. MVP in progress with public roadmap."
          link="https://github.com/users/colinhebe/projects/3"
        />
      </section>

      <footer className="mt-24 text-sm text-muted-foreground w-full text-center flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} Colin Lyu</span>
          <Button
            size="icon"
            variant="ghost"
            title="Toggle font"
            aria-label="Toggle handwriting font / default font"
            style={{ padding: 0, width: 32, height: 32 }}
            onClick={toggleFont}
          >
            <TypeOutline />
          </Button>
        </div>
      </footer>
    </main>
  );
}

function Project({
  name,
  description,
  link,
  github,
}: {
  name: string;
  description: string;
  link?: string;
  github?: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-2">
        <h2 className="text-xl font-semibold leading-tight">{name}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex gap-2 pt-2">
          {link && (
            <Button variant="link" asChild>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Visit <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
          )}
          {github && (
            <Button variant="link" asChild>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <DynamicIcon name="github" className="w-4 h-4 mr-1" /> GitHub
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
