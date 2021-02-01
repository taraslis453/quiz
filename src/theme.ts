import { createMuiTheme } from "@material-ui/core/styles";
declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    customShadows: {
      success: string;
      error: string;
      default: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    customShadows?: {
      success: string;
      error: string;
      default: string;
    };
  }
}

export const theme = createMuiTheme({
  customShadows: {
    success: "0 3px 5px 2px rgba(33, 243, 86, 0.349)",
    error: "0 3px 5px 2px rgba(33, 243, 86, 0.349)",
    default: "0 3px 5px 2px rgba(2, 2, 2, 0.281)",
  },
});
