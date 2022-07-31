import { atom } from "recoil";

export const shipPositionState = atom({
  key: "shipPosition",
  default: {
    position: {},
    rotation: {}
  }
})