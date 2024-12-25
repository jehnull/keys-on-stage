import { Note, Chord } from "tonal";

export const pushedNotesList: string[] = [];

// detect chord from list of notes
export function detectChord(pushedNotesList: any[]) {
  const detectedChord = Chord.detect(pushedNotesList);
  if (detectedChord.length == 0) {
    return pushedNotesList;
  }

  return detectedChord;
}

// MIDI connection success
export const midiSuccess = async (midiAccess: any) => {
  console.log("MIDI Connected!!");

  // Get MIDI inputs
  const midiInputs = midiAccess.inputs;
  midiInputs.forEach((input: any) => {
    console.log(input);
    input.addEventListener("midimessage", handleMidiInput);
  });

  // handle MIDI input
  function handleMidiInput(input: { data: any[] }) {
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    switch (command) {
      case 144:
        if (velocity > 0) {
          noteOn(note, velocity);
        } else {
          noteOff(note);
        }
        break;
      case 128:
        noteOff(note);
        break;
    }
  }

  // note ON
  function noteOn(note: any, velocity: any) {
    const pushedNote = Note.fromMidi(note);
    console.log("PRESSED: ", pushedNote, velocity);

    pushedNotesList.push(pushedNote);
    console.log("PUSHED NOTES - on: ", detectChord(pushedNotesList));
  }

  // note OFF
  function noteOff(note: any) {
    const pushedNote = Note.fromMidi(note);
    console.log("RELEASED: ", pushedNote);

    pushedNotesList.splice(pushedNotesList.indexOf(pushedNote), 1);
    console.log("PUSHED NOTES - off: ", detectChord(pushedNotesList));
  }
};
