import CommandRecapPanel from "./CommandRecapPanel";
import { gitCommandGroups } from "../data/techCommandRecaps";

export default function GitCommandReference() {
  return (
    <CommandRecapPanel
      id="git-command-recap"
      variant="emerald"
      title="Git command recap"
      subtitle='What each command is for. Use git help <command> for full options.'
      groups={gitCommandGroups}
    />
  );
}
