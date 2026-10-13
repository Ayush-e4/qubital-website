import { Composition } from 'remotion';
import { ACCESS_REQUEST_FRAMES, AccessRequest } from './clips/AccessRequest';
import { AGENT_SCOPE_FRAMES, AgentScope } from './clips/AgentScope';
import { JUST_IN_TIME_FRAMES, JustInTime } from './clips/JustInTime';
import { PASSKEY_FRAMES, Passkey } from './clips/Passkey';
import { WORKFORCE_FRAMES, Workforce } from './clips/Workforce';
import type { ClipProps } from './ui';

const defaults: ClipProps = { theme: 'dark', locale: 'en' };
// The window fills most of the frame; the site fits the clip into its box
// (object-fit: contain) on a background of the same colour.
const size = { width: 1080, height: 860, fps: 30 };

export function Root() {
  return (
    <>
      <Composition id="access-request" component={AccessRequest} durationInFrames={ACCESS_REQUEST_FRAMES} defaultProps={defaults} {...size} />
      <Composition id="just-in-time" component={JustInTime} durationInFrames={JUST_IN_TIME_FRAMES} defaultProps={defaults} {...size} />
      <Composition id="passkey" component={Passkey} durationInFrames={PASSKEY_FRAMES} defaultProps={defaults} {...size} />
      <Composition id="workforce" component={Workforce} durationInFrames={WORKFORCE_FRAMES} defaultProps={defaults} {...size} />
      <Composition id="agent-scope" component={AgentScope} durationInFrames={AGENT_SCOPE_FRAMES} defaultProps={defaults} {...size} />
    </>
  );
}
