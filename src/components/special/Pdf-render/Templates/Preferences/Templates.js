import DefaultTemplate from "../DefaultTemplate";
import defaultThumb from "./default.jpg"

import ModernTemplate_A from "../ModernTemplate_A";
import modernThumb from "./moderne.jpg"

import ClassicTemplate from "../ClassicTemplate";
import classicThumb from "./classic.jpg"


export const Templates = [
  {
    id: 0,
    name: "My Cviotek",
    active: false,
    tamplate: <DefaultTemplate />,
    comp: DefaultTemplate,
    thumb:defaultThumb
  },
  {
    id: 1,
    name: "Classic Style",
    active: false,
    tamplate: <ClassicTemplate />,
    comp: ClassicTemplate,
    thumb:classicThumb
  },
  {
    id: 2,
    name: "Modern Style",
    active: false,
    tamplate: <ModernTemplate_A />,
    comp: ModernTemplate_A,
    thumb:modernThumb
  }
];
