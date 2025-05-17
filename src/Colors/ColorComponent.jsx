// ColorComponent.js
export const Colors = {
  lightblue: "#0B2565",
  blue: "#0316CD",
  lightBlack: "#2A2929",
  white: "#FFFFFF",
  light: "#F1F1F1",
  coolBlack: "#333333",
  ashBlack: "#2A2929",
  offWhite: "#f0f0f0",
};

export const Shadows = {
  goldShadow: `
    0 0 2px #191947,
    0 0 2px #3b3b7f,
    0 0 2px #292955,
    0 0 2px #202058
  `,
  lightShadow: "#9E7A2C",
};

export const Gradients = {
  goldGradient: `
    linear-gradient(
      180deg,
      #0b090a 0%,
      #a08733 10%,
      #f3d57f 20%,
      #7d6023 30%,
      #f3d57f 40%,
      #9c782c 50%,
      #7d6023 60%,
      #8c6c28 70%,
      #9a762a 80%,
      #f3d57f 90%,
      #0b090a 100%
    )
  `,
  lightToDark: `linear-gradient(9deg, #4F7716 2%, #3c5f0c 20%, #4F7716 66% ,   #4F7716 100%)`,
  greenToDarkGreen: `
 radial-gradient(circle, #325300 13%,#325300 93%, #325300 100%)

  `,
  greenToDarkGreen2: `
 radial-gradient(circle, #dbe8cf 13%, rgba(226,236,217,1) 93%, rgba(182,208,159,1) 100%)

  `,
  lightGoldToGold: `
    linear-gradient(
      185deg,
      #d8d5ce 0%,
      #f5f2ea 10%,
      #d8d5ce 20%,
      #f5f2ea 30%,
      #f5f2ea 60%,
      #d8d5ce 70%,
      #f5f2ea 80%,
      #f5f2ea 90%,
      #d8d5ce 100%
    )
  `,
};

export default { Colors, Shadows, Gradients };
