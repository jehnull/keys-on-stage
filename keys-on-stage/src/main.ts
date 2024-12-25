import { pixiCanvas } from "./pixi";
import { notSupportedBrowserScreen, midiFailScreen } from "./midiErrorScreens";
import { midiSuccess } from "./midi";

async function keysOnStage() {
  // check if browser supports MIDI
  // if no, display error screen "notSupportedBrowserScreen()"
  if (!navigator.requestMIDIAccess) {
    console.error("MIDI not supported in this browser.");
    notSupportedBrowserScreen();
    return;
  }

  try {
    // request MIDI access
    // if yes, continue with all MIDI and PIXI stuff
    const midiAccess = await navigator.requestMIDIAccess();
    midiSuccess(midiAccess);

    await pixiCanvas();
    
  } catch (error) {
    if (error) {
    //if no connection to MIDI, display error screen "midiFailScreen()"
      midiFailScreen();
      console.error("Could not connect MIDI");
    }
  }
}

keysOnStage();
