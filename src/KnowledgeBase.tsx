import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "Android Paint",
    date: "2020-03-16",
    filename: "2020-03-16-Android Paint.md",
  },
  {
    title: "2025 Android tech stack",
    date: "2025-06-30",
    filename: "2025 Android tech stack.md",
  },
];

export default function KnowledgeBase() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-12 w-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
          <Button variant="outline" asChild>
            <Link to="/">Home</Link>
          </Button>
        </div>
        <p className="text-muted-foreground">My Markdown Notes</p>
      </header>
      <section className="space-y-6 w-full">
        {posts.map((post) => (
          <Card key={post.filename}>
            <CardContent className="space-y-2">
              <h2 className="text-xl font-semibold leading-tight">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground">{post.date}</p>
              <div className="flex justify-end">
                <Button variant="outline" asChild>
                  <Link
                    to={`/read/${encodeURIComponent(post.filename)}`}
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    Read <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
