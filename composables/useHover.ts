export const useHover = () => {
  const isHover = useState("hover", () => false);
  const scaleType = useState<"big" | "small" | "none">("scale", () => "big");
  const setHover = (hover: boolean, type: "small" | "big" | "none" = "big") => {
    isHover.value = hover;
    scaleType.value = type;
  };

  return {
    isHover,
    setHover,
    scaleType,
  };
};
