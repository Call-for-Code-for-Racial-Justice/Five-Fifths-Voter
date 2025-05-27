export const coreceBoolean = (val) => {
  if (typeof val === "string")
    return val === "true";
  return val;
};
