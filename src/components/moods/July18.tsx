import { Card } from "../ui/card";

export default function Mood() {
  return (
    <Card>
      <div className="relative w-full">
        <p className="text-center text-2xl">Saw a mug</p>
        <div className="w-full">
          <img
            src="./assets/moods/smile_mug.png"
            alt="Saw a mug"
            className="w-full h-auto rounded-lg mt-4"
          />
        </div>
        <div className="text-center text-xs text-muted-foreground mt-2">
          <p>Feeling happy and inspired!</p>
          <p>July 18, 2025</p>
        </div>
      </div>
    </Card>
  );
}
