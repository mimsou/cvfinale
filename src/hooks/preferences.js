import { Fonts } from "components/special/Pdf-render/Templates/Preferences/Fonts";
import { Templates } from "components/special/Pdf-render/Templates/Preferences/Templates";
import { Palettes } from "components/special/Pdf-render/Templates/Preferences/Palettes";

export const getPreference = (prefs) => {
  if (typeof prefs?.Template != "undefined" ) {
    return {
      Template: Templates.filter((template) => {
        if (template.id == prefs.Template.id) {
          return true;
        }
        return false;
      })[0],
      Font: Fonts.filter((font) => {
        if (font.id == prefs.Font.id) {
          return true;
        }
        return false;
      })[0],
      Palette: Palettes.filter((palette) => {
        if (palette.id == prefs.Palette.id) {
          return true;
        }
        return false;
      })[0],
    };
  } else {
    return {
      Template: Templates[0],
      Font: Fonts[0],
      Palette: Palettes[0],
    };
  }
};
