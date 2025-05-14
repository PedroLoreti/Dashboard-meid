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
        <Header toggleTheme={toggleTheme}/>
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
  transition: background-color 0.3s ease-in-out;
`;

export default App;
