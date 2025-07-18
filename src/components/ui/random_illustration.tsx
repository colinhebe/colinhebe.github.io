import { useEffect, useState } from "react";
import { fetchRandomRobohashPng } from "@/lib/service";

export interface RandomIllustrationProps {
  className?: string;
  style?: React.CSSProperties;
  seed?: string;
}

export function RandomIllustration({
  className,
  style,
  seed,
}: RandomIllustrationProps) {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const getUrl = async () => {
      if (typeof seed === "string" && seed.length > 0) {
        const url = `https://robohash.org/${encodeURIComponent(
          seed
        )}?set=set3&size=200x200`;
        if (isMounted) setImgUrl(url);
        setLoading(false);
      } else {
        const result = await fetchRandomRobohashPng();
        if (isMounted) setImgUrl(result);
        setLoading(false);
      }
    };
    getUrl();
    return () => {
      isMounted = false;
    };
  }, [seed]);
  if (loading) {
    return (
      <div className={className} style={style}>
        Loading...
      </div>
    );
  }
  if (!imgUrl) {
    return (
      <div className={className} style={style}>
        Failed to load
      </div>
    );
  }
  return (
    <img
      src={imgUrl}
      alt="Random illustration"
      className={className}
      style={style}
      loading="lazy"
    />
  );
}
