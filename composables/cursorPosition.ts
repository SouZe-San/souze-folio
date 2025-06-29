export const useCursorPosition = () => {
  const cursorPosition = useState("cursor", () => ({ x: 50, y: 50 }));
  const setPosition = (x: number, y: number) => {
    cursorPosition.value = { x, y };
  };
  return {
    cursorPosition,
    setPosition,
  };
};
