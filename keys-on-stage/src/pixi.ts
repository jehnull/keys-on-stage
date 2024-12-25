import { Application, Assets, Sprite, Text } from "pixi.js";
import { pushedNotesList, detectChord } from "./midi";

export const pixiCanvas = async () => {
  
  /** PIXI.js template code **/
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  
  // Text example with detectChord to display pressed notes/chords
  console.log("INSIDE PIXI.TS: ", pushedNotesList)
  const text = new Text({ text: detectChord(pushedNotesList) });

  // Load the bunny texture
  const texture = await Assets.load("/keys-on-stage/assets/bunny.png");

  // Create a bunny Sprite
  const bunny = new Sprite(texture);

  // Center the sprite's anchor point
  bunny.anchor.set(0.5);
  text.anchor.set(0.5);

  // Move the sprite to the center of the screen
  bunny.position.set(app.screen.width / 2, app.screen.height / 2);
  text.position.set(app.screen.width / 2, app.screen.height / 2);

  // Add the bunny to the stage
  app.stage.addChild(bunny);
  app.stage.addChild(text);

  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    bunny.rotation += 0.1 * time.deltaTime;
  });

  app.ticker.add(() => {
    text.text = detectChord(pushedNotesList).join(", ");
  });
};
