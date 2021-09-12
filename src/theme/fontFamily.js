const fontFamily = [
  {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `
      local('Poppins-Regular'),
      url(${process.env.PUBLIC_URL}/fonts/Poppins-Regular.ttf) format('truetype')
    `
  },
  {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `
      local('Roboto'),
      local('Roboto-Regular'),
      url(${process.env.PUBLIC_URL}/fonts/Roboto-Regular.ttf) format('truetype')
    `
  },
  {
    fontFamily: "Roboto-Light",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `
      local('Roboto-Light'),
      url(${process.env.PUBLIC_URL}/fonts/Roboto-Light.ttf) format('truetype')
    `
  }
];

export default fontFamily;
