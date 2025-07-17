// scripts/deploy.js
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { join } from "path";

const dist = join(process.cwd(), "dist");
writeFileSync(join(dist, ".nojekyll"), "");

const exec = (cmd) =>
  execSync(cmd, { stdio: "inherit", shell: true, cwd: dist });
exec("git init");
try {
  exec("git checkout gh-pages");
} catch {
  exec("git checkout -b gh-pages");
}
exec("git add .");
let needCommit = true;
try {
  execSync("git diff --cached --quiet", { cwd: dist });
  needCommit = false;
} catch {
  needCommit = true;
}
if (needCommit) {
  exec('git commit -m "deploy"');
} else {
  console.log("No changes to commit.");
}
try {
  exec("git remote remove origin");
} catch {}
exec(
  "git remote add origin https://github.com/colinhebe/colinhebe.github.io.git"
);
exec("git push -f origin gh-pages");
