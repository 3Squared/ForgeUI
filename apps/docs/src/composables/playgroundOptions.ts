export const autoCompleteStates = ["off", "on"];
export const inputTypes = ["text", "number", "email", "password", "search", "url", "tel", "date", "time", "range", "color", "checkbox", "textarea"];
export const linkTargets = ["_blank", "_self", "_parent", "_top"];

//Popover
export const placement = [
  "auto",
  "top",
  "topleft",
  "topright",
  "right",
  "righttop",
  "rightbottom",
  "bottom",
  "bottomleft",
  "bottomright",
  "left",
  "lefttop",
  "leftbottom"
];
export const fallbackPlacement = [...placement, "flip", "clockwise", "counterclockwise"];
export const boundary = ["scrollParent", "viewport", "window"];
export const triggers = ["click", "hover", "focus"];

export const sizes = [
  { text: "Small", value: "sm" },
  { text: "Medium", value: "md" },
  { text: "Large", value: "lg" }
];

export const validationStates = [
  { text: "No Validation", value: null },
  { text: "Valid Validation", value: true },
  { text: "Invalid Validation", value: false }
];

export const baseVariants = ["primary", "secondary", "success", "warning", "danger", "info", "light", "dark"];
export const buttonVariants = [...baseVariants, ...baseVariants.map((b) => `outline-${b}`)];
