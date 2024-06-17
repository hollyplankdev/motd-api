import { Center, Container, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import background from "./background.jpg";
import HistoryPanel from "./features/history/HistoryPanel";
import LatestMotdDisplay from "./features/motd/LatestMotdDisplay";
import theme from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <ModalsProvider>
          <Container className="App" style={{ backgroundImage: `url(${background})` }}>
            <HistoryPanel />
            <Center h="100%">
              <LatestMotdDisplay />
            </Center>
          </Container>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
