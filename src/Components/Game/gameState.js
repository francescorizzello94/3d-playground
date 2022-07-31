import { atom } from "recoil";

export const shipPositionState = atom({
  key: "shipPosition",
  default: {
    position: {},
    rotation: {}
  }
});

export const enemyPositionState = atom({
  key: "enemyPosition",
  default: [
    {
      x: -10,
      y: 10,
      z: -80
    },
    {
      x: 20,
      y: 0,
      z: -100
    },
    {
      x: 40,
      y: 20,
      z: -80
    }
  ]
});

export const laserPositionState = atom({
  key: "laserPositions",
  default: []
});

export const scoreState = atom({
  key: "score",
  default: 0
});