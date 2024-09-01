import React, { useState } from "react";
import { NextUIProvider, createTheme } from "@nextui-org/react";

const lightTheme = createTheme({ type: "light" });
const darkTheme = createTheme({ type: "dark" });

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
      <button onClick={toggleTheme}>
        Switch to {isDark ? "Light" : "Dark"} Theme
      </button>
      <YourComponent />
    </NextUIProvider>
  );
}

export default App;
