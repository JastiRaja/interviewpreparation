import FullStackTrackView from "./FullStackTrackView";
import { observabilityTrack } from "../data/fullstackTracks";

export default function ObservabilityModule() {
  return <FullStackTrackView track={observabilityTrack} />;
}
