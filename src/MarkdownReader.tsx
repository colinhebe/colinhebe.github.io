import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export default function MarkdownReader() {
  const { filename } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!filename) return;
    fetch(`/public/posts/${filename}`)
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then(setContent)
      .catch((e) => setError(e.message));
  }, [filename]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold">Markdown Reader</h1>
        <Button variant="outline" asChild>
          <Link to="/kb">Knowledge Base</Link>
        </Button>
      </header>
      <Card className="w-full">
        <CardContent className="prose max-w-none py-6">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <MarkdownRender content={content} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}

function MarkdownRender({ content }: { content: string }) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
  );
}
