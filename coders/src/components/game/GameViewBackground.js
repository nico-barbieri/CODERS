import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import Loading from "../Loading";
import { getCollision } from "./Game";
import { animate } from "./animateBackground";
import { Boundary, Sprite, Stage, View } from "./utilities/gameClasses";
import usePreloader from "../../hooks/usePreloader";
import { ObjToArray } from "../utilities";
import { GameContext } from "./utilities/GameContext";

/**
 *
 * @param {object} settings must contain a settings object as a parameter. (more infos about settings will be added)
 * @returns the game within a canvas element
 */
const GameViewBackground = () => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const { context, setContext } = useContext(GameContext);

  const { numberOfSections = 3, imagesSources, collisionsSources } = context;

  //scale of pixel art (400%)
  const globalScale = 4;

  //Keep track of pressed keys
  const keys = useRef({
    left: {
      pressed: false,
    },
    right: {
      pressed: false,
    },
    up: {
      pressed: false,
    },
    down: {
      pressed: false,
    },
    shift: {
      pressed: false,
    },
    lastkey: "",
  });

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "d":
        keys.current = {
          ...keys.current,
          right: { pressed: true },
          lastkey: "right",
        };
        break;
      case "a":
        keys.current = {
          ...keys.current,
          left: { pressed: true },
          lastkey: "left",
        };
        break;
      case "w":
        keys.current = {
          ...keys.current,
          up: { pressed: true },
          lastkey: "up",
        };
        break;
      case "s":
        keys.current = {
          ...keys.current,
          down: { pressed: true },
          lastkey: "down",
        };
        break;
      case "Shift":
        keys.current = {
          ...keys.current,
          shift: { pressed: true },
          lastkey: "shift",
        };
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    switch (e.key) {
      case "d":
        keys.current = {
          ...keys.current,
          right: { pressed: false },
          lastkey: "right",
        };
        break;
      case "a":
        keys.current = {
          ...keys.current,
          left: { pressed: false },
          lastkey: "left",
        };
        break;
      case "w":
        keys.current = {
          ...keys.current,
          up: { pressed: false },
          lastkey: "up",
        };
        break;
      case "s":
        keys.current = {
          ...keys.current,
          down: { pressed: false },
          lastkey: "down",
        };
        break;
      case "Shift":
        keys.current = {
          ...keys.current,
          shift: { pressed: false },
          lastkey: "shift",
        };
        break;
      default:
        break;
    }
  };

  const canvasRef = useRef(null);

  const [scaleRatio, setScaleRatio] = useState();

  const allImagesLoaded = useCallback(usePreloader(ObjToArray(imagesSources)));

  //create images
  //map
  let mapBackground = new Image();
  mapBackground.src = imagesSources.map.background;
  mapBackground.onload = () => {
    setScaleRatio(
      (window.innerHeight * numberOfSections) / mapBackground.height
    );
    console.log("Scale ratio: " + scaleRatio);
};

  let mapForeground = new Image();
  mapForeground.src = imagesSources.map.foreground;

  //default player
  let defaultPlayerUp = new Image();
  defaultPlayerUp.src = imagesSources.defaultPlayer.still.up;
  let defaultPlayerWalkingUp = new Image();
  defaultPlayerWalkingUp.src = imagesSources.defaultPlayer.walk.up;

  let defaultPlayerDown = new Image();
  defaultPlayerDown.src = imagesSources.defaultPlayer.still.down;
  let defaultPlayerWalkingDown = new Image();
  defaultPlayerWalkingDown.src = imagesSources.defaultPlayer.walk.down;

  let defaultPlayerRight = new Image();
  defaultPlayerRight.src = imagesSources.defaultPlayer.still.right;
  let defaultPlayerWalkingRight = new Image();
  defaultPlayerWalkingRight.src = imagesSources.defaultPlayer.walk.right;

  let defaultPlayerLeft = new Image();
  defaultPlayerLeft.src = imagesSources.defaultPlayer.still.left;
  let defaultPlayerWalkingLeft = new Image();
  defaultPlayerWalkingLeft.src = imagesSources.defaultPlayer.walk.left;

  let playerShadow = new Image();
  playerShadow.src = "./data/res/img/sprites/shadow.png";

  useEffect(() => {
    setLoading(true);
    setContext((context) => ({
      ...context,
      isLoading: true,
    }));
    
    let animationFrameId;

    if (allImagesLoaded && scaleRatio) {
      console.log("resources loaded");
      setContext((context) => ({
        ...context,
        isLoading: false,
      }));

      //create view (settings of canvas which will contain the game)
      const view = new View({
        canvas: canvasRef.current,
        //proportions depends on map. In this case, every section is 48*28 tiles
        proportions: context.proportions,
      });

      //init view
      view.setDimensions(
        window.innerWidth,
        window.innerHeight * numberOfSections
      );
      view.init();

      //offset of the map
      let offset = context.gameSettings.offset;

      //create stage background and foreground. These are images which will be drawn in canvas
      const stageBackground = new Stage({
        view: view,
        position: {
          x: offset.x,
          y: offset.y, 
        },
        dimensions: context.gameSettings.mapDimensions,
        proportions: context.proportions,
        image: mapBackground,
      });

      const stageForeground = new Stage({
        view: view,
        position: {
          x: offset.x,
          y: offset.y,
        },
        dimensions: context.gameSettings.mapDimensions,
        proportions: context.proportions,
        image: mapForeground,
      });

      /*CREATION OF COLLISION
            - get collision from json file as an array of codes that symbolize tiles
            - rearrange that array as an array of arrays based on map width in number of tiles
            - create the actual collision tiles based on that array*/

      const obstaclesRAW = getCollision(
        collisionsSources.obstacles,
        "collisions"
      );

      const collisions = {
        obstacles: [],
      };

      // (48 is the number of tiles of map width)
      for (let i = 0; i < obstaclesRAW.length; i += 48) {
        collisions.obstacles.push(obstaclesRAW.slice(i, 48 + i));
      }

      //create boundaries/walkables array and populate it
      let boundaries = [];
      let walkableTiles = [];

      const setBoundaries = () => {
        collisions.obstacles.forEach((row, i) => {
          row.forEach((symbol, j) => {
            if (symbol !== 0) {
              const code = collisions.obstacles[0][0];
              switch (symbol) {
                case code:
                  boundaries.push(
                    new Boundary({
                      scaleRatio,
                      globalScale,
                      view: view,
                      position: {
                        x: 16 * globalScale * scaleRatio * j + offset.x,
                        y: 16 * globalScale * scaleRatio * i + offset.y,
                      },
                    })
                  );
                  break;

                case code + 1:
                  boundaries.push(
                    new Boundary({
                      scaleRatio,
                      globalScale,
                      view: view,
                      position: {
                        x: 16 * globalScale * scaleRatio * j + offset.x,
                        y: 16 * globalScale * scaleRatio * i + offset.y,
                      },
                      scale: {
                        x: 1,
                        y: 12 / 16 - 0.01,
                      },
                      offset: {
                        x: 0,
                        y: 7,
                      },
                    })
                  );
                  break;

                case code + 2:
                  boundaries.push(
                    new Boundary({
                      scaleRatio,
                      globalScale,
                      view: view,
                      position: {
                        x: 16 * globalScale * scaleRatio * j + offset.x,
                        y: 16 * globalScale * scaleRatio * i + offset.y,
                      },
                      scale: {
                        x: 1,
                        y: 12 / 16 - 0.01,
                      },
                      offset: {
                        x: 0,
                        y: -0.001,
                      },
                    })
                  );
                  break;
                case code + 3:
                  boundaries.push(
                    new Boundary({
                      scaleRatio,
                      globalScale,
                      view: view,
                      position: {
                        x: 16 * globalScale * scaleRatio * j + offset.x,
                        y: 16 * globalScale * scaleRatio * i + offset.y,
                      },
                      scale: {
                        x: 0.25,
                        y: 1,
                      },
                      offset: {
                        x: 12,
                        y: 0,
                      },
                    })
                  );
                  break;
                case code + 4:
                  walkableTiles.push({
                    x: 16 * globalScale * scaleRatio * j + offset.x,
                    y:
                      16 * globalScale * scaleRatio * i +
                      offset.y -
                      (32 * globalScale * scaleRatio) / 3,
                  });
                  break;

                default:
                  boundaries.push(
                    new Boundary({
                      scaleRatio,
                      globalScale,
                      view: view,
                      position: {
                        x: 16 * globalScale * scaleRatio * j + offset.x,
                        y: 16 * globalScale * scaleRatio * i + offset.y,
                      },
                    })
                  );
                  break;
              }
            }
          });
        });
      };

      //default configuration of player (and NPCs)
      const defaultPlayerConfig = {
        view: view,
        image: defaultPlayerDown,
        cutBorder: {
          x: 0,
          y: 1,
        },
        scaleDown: scaleRatio,
        frames: {
          max: 6,
          hold: 7,
        },
        sprites: {
          up: defaultPlayerUp,
          down: defaultPlayerDown,
          right: defaultPlayerRight,
          left: defaultPlayerLeft,
          walk: {
            up: defaultPlayerWalkingUp,
            down: defaultPlayerWalkingDown,
            right: defaultPlayerWalkingRight,
            left: defaultPlayerWalkingLeft,
          },
        },
        shadow: {
          active: false,
          src: playerShadow,
        },
        position: {
          x: view.canvas.width / 2 - 32,
          y: view.canvas.height / 2 - 64,
        },
        obstacle: false,
        controlled: false,
      };

      //creation of controlled player: sprites should be set according to user settings
      const controlled = new Sprite({
        ...defaultPlayerConfig,
        image: defaultPlayerWalkingRight,
        controlled: true,
      });

      //creation of various "NPCs"
      const player1 = new Sprite({ ...defaultPlayerConfig });

      const player2 = new Sprite({
        ...defaultPlayerConfig,
        image: defaultPlayerRight,
      });

      const player3 = new Sprite({
        ...defaultPlayerConfig,
        image: defaultPlayerLeft,
      });

      const player4 = new Sprite({
        ...defaultPlayerConfig,
        image: defaultPlayerUp,
      });

      const player5 = new Sprite({
        ...defaultPlayerConfig,
        image: defaultPlayerWalkingDown,
      });

      const player6 = new Sprite({
        ...defaultPlayerConfig,
        image: defaultPlayerWalkingUp,
      });

      const player7 = new Sprite({
        ...defaultPlayerConfig,
        image: defaultPlayerWalkingLeft,
      });

      const players = [
        player1,
        player2,
        player3,
        player4,
        player5,
        player6,
        player7,
        controlled,
      ];

      const stage = {
        stageBackground: stageBackground,
        stageForeground: stageForeground,
      };

      const settings = {
        players,
        frameCount: 0,
        playerSettings: {
          speed: {
            walk: 1,
            run: 2,
          },
        },
        keys,
        stage,
        boundaries,
        walkableTiles,
      };

      let frameCount = 0;
      const render = () => {
        animate({ ...settings, frameCount: frameCount, keys: keys.current });
        frameCount++;
        animationFrameId = window.requestAnimationFrame(render);
      };

      setBoundaries();

      setLoading(false);

      render();
    } else {
      setLoading(true);
    }

    //EVENT LISTENERS
    window.addEventListener("keydown", handleKeyDown);

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [canvasRef, allImagesLoaded]);

  return (
    <>
      {err && (
        <h1 style={{ fontSize: "2rem", padding: "1rem" }}>
          Something went wrong. Please reload the page.
        </h1>
      )}
      {(loading || context.isLoading) && !err && <Loading />}
      <canvas
        ref={(el) => {
          canvasRef.current = el;
        }}
        id="game-view"
      ></canvas>
    </>
  );
};

export default React.memo(GameViewBackground);
