import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-12 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-3xl font-bold mb-2">Colin Lyu</h1>
            <p className="text-muted-foreground">
              Engineer · Builder · Minimalist
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/kb">Knowledge Base</Link>
          </Button>
        </div>
      </header>

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

      <footer className="mt-24 text-sm text-muted-foreground w-full text-center">
        © {new Date().getFullYear()} Colin Lyu
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
