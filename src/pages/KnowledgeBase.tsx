import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpenText, House, TypeOutline } from "lucide-react";
import { Link } from "react-router-dom";
import { toggleFont } from "@/lib/utils";
import { RandomIllustration } from "@/components/ui/random_illustration";

const posts = [
  {
    title: "Comparison of Flutter State Management Mechanisms",
    date: "2025-07-18",
    filename: "2025-07-18-flutter_state_mgmt.md",
  },
  {
    title: "2025 Android tech stack",
    date: "2025-06-30",
    filename: "2025 Android tech stack.md",
  },
  {
    title: "Android Paint",
    date: "2020-03-16",
    filename: "2020-03-16-Android Paint.md",
  },
];

export default function KnowledgeBase() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-12 w-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link onClick={toggleFont} to="#">
                <TypeOutline />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">
                <House />
              </Link>
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">My Markdown Notes</p>
      </header>
      <section className="space-y-6 w-full">
        {posts.map((post) => (
          <Card key={post.filename}>
            <CardContent className="relative flex flex-col justify-between py-4">
              <div>
                <h2 className="text-xl font-semibold leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" asChild>
                  <Link
                    to={`/read/${encodeURIComponent(post.filename)}`}
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    <BookOpenText />
                  </Link>
                </Button>
              </div>
              <div className="absolute left-1/2 -bottom-6 -translate-x-1/3 flex items-end justify-center w-full h-[75%]">
                <RandomIllustration
                  className="h-full w-auto"
                  seed={post.filename}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
