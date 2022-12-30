import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { Wrapper } from "./components/Wrapper";

import "./styles/global.css";

export function App() {
  return (
    <div>
      <Header />

      <Wrapper>
        <Tasks />
      </Wrapper>
    </div>
  );
}
