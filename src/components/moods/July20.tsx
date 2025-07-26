import { Card } from "../ui/card";

export default function Mood() {
  return (
      <Card>
          <div className="relative w-full">
              <p className="text-center text-2xl">Rhymove first build</p>
              <div className="w-full">
                  <img
                      src="./assets/moods/rhymove_logo.png"
                      alt="Rhymove logo"
                      className="w-full h-auto rounded-lg mt-4"
                  />
              </div>
              <div className="text-center text-xs text-muted-foreground mt-2">
                  <p>Training follow voice introduction!</p>
                  <p>July 20, 2025</p>
              </div>
          </div>
      </Card>
  )
}
