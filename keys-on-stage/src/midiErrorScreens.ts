import { Application, Text, TextStyle } from "pixi.js";

// error screen for browsers that do not support MIDI
export const notSupportedBrowserScreen = async () => {
  await midiErrorScreens(
    "#ff94ea",
    "This browser does not support MIDI :( Please try another browser that supports MIDI connection such as Chrome or Firefox.",
    browserNotSupportedTextStyle
  );
};

//error screen for when MIDI connection fails
export const midiFailScreen = async () => {
  await midiErrorScreens(
    "#b82e47",
    "Could not connect to MIDI! Please try again. :'(",
    midiFailTextStyle
  );
};

//pixi canvas base code
const midiErrorScreens = async (
  backgroundColor: string,
  message: string,
  textStyle: TextStyle
) => {
  const app = new Application();
  await app.init({ background: backgroundColor, resizeTo: window });
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const text = new Text({ text: message, style: textStyle });
  text.anchor.set(0.5);
  text.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(text);
};

// text styles
const midiFailTextStyle = new TextStyle({
  fill: "white",
  fontSize: 18,
});

const browserNotSupportedTextStyle = new TextStyle({
  fill: "black",
  fontSize: 18,
});
