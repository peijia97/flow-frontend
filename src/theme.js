import createMuiTheme from "@material-ui/core/styles/createTheme";

const fontFamily = ["Roboto", "Helvetica Neue", "Arial", "sans-serif"];
const colors = {
  primary: "#008CDC",
  secondary: "#fae100",
  primaryLight: "#1e95da",
  primaryDark: "#007ABF",
  success: "#009C6A",
  successLight: "#d1ffe3",
  danger: "#D94D4C",
  grey100: "#F5F6F9",
  grey200: "#edf2f7",
  grey300: "#ececec",
  grey400: "#cbd5e0",
  grey500: "#a0aec0",
  grey600: "#718096",
  grey700: "#4a5568",
  grey800: "#2d3748",
  grey900: "#1a202c"
};
export const theme = createMuiTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    grey: {
      100: colors.grey100,
      200: colors.grey200,
      300: colors.grey300,
      400: colors.grey400,
      500: colors.grey500,
      600: colors.grey600,
      700: colors.grey700,
      800: colors.grey800,
      900: colors.grey900
    }
  },
  typography: {
    fontFamily: `${fontFamily.join(",")} !important`
  },
  overrides: {
    MuiTypography: {
      h3: {
        fontSize: "1.3rem",
        fontWeight: "bold",
        color: colors.grey900,
        lineHeight: "2.2rem"
      },
      h5: {
        fontSize: "1.1rem",
        fontWeight: "600",
        color: colors.grey800
      },
      h6: {
        fontSize: "0.95rem",
        fontWeight: "600",
        color: colors.grey800
      },
      subtitle1: {
        fontSize: "0.8rem",
        color: colors.grey500,
        lineHeight: `${1.3} !important`
      },
      body1: {
        fontSize: "0.9rem",
        fontWeight: "500",
        color: colors.grey700,
        lineHeight: `${1.3} !important`
      },
      body2: {
        fontSize: "0.8rem",
        fontWeight: "500",
        color: colors.grey500,
        lineHeight: `${1.3} !important`
      }
    },
    MuiButton: {
      outlined: {
        border: `0.12rem solid ${colors.primary} !important`,
        textTransform: "capitalize",
        color: `${colors.primary} !important`,
        backgroundColor: "#fff !important",
        width: "100%",
        padding: "1rem",
        fontWeight: "bold !important",
        lineHeight: "1.3rem"
      },
      contained: {
        background: `${colors.primary} !important`,
        fontSize: "0.9rem",
        minWidth: "6.5rem",
        textTransform: "capitalize",
        padding: "0.5rem 1.5rem",
        color: "#fff !important",
        border: "none !important",
        fontWeight: "bold !important",
        lineHeight: "1.3rem",
        overflow: "hidden"
      },
      text: {
        fontSize: "0.8rem",
        color: `${colors.primary} !important`,
        textTransform: "inherit",
        fontWeight: "500 !important",
        lineHeight: "1.3rem",
        backgroundColor: "transparent !important"
      }
    },
    MuiAppBar: {
      root: {
        backgroundColor: "white !important"
      }
    },
    MuiTabs: {
      root: {
        minHeight: "2rem"
      },
      indicator: {
        // backgroundColor: `${colors.primaryLight} !important`,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
          maxWidth: "4.5rem",
          width: "100%",
          backgroundColor: colors.primary
        }
      }
    },
    MuiTab: {
      root: {
        minHeight: "2rem"
      },
      wrapper: {
        textTransform: "capitalize",
        fontWeight: 600
      }
    },
    MuiInputBase: {
      input: {
        fontSize: "0.9rem"
      }
    },
    MuiPaper: {
      outlined: {
        border: `0.13rem solid ${colors.grey300}`,
        borderRadius: "0.2rem"
      }
    },
    MuiCheckbox: {
      root: {
        color: colors.grey400
      }
    }
  }
});
