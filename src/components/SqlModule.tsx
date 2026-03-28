import FullStackTrackView from "./FullStackTrackView";
import { sqlTrack } from "../data/fullstackTracks";

export default function SqlModule() {
  return <FullStackTrackView track={sqlTrack} />;
}
