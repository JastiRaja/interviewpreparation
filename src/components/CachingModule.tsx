import FullStackTrackView from "./FullStackTrackView";
import { cachingTrack } from "../data/fullstackTracks";

export default function CachingModule() {
  return <FullStackTrackView track={cachingTrack} />;
}
