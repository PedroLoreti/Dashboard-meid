import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./style/theme";
import { Header } from "./components/Header";
import { RoutesMain } from "./routes/RoutesMain";
import "./style/index.scss";
import { useTheme } from "./providers/ThemeContext";

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Container>
        <Header />
        <button onClick={toggleTheme}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <RoutesMain />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.background}; /* Aplicando a cor de fundo do tema */
`;

export default App;
// SHEET ID = "https://docs.google.com/spreadsheets/d/1gLgpkSABsg49X4ZkBj_nxL0Ufu25j1XcPVqAqA-2JlI/edit?gid=366139392#gid=366139392"
// RANGE = "A2:J"
// key pc t AIzaSyAwHgfXP2ZuqZQ1xcH18wTcu6q1-evDAT4
