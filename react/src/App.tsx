import "./App.css";
import { TextAnimation } from "./components/text-animation";

const components = [
  {
    title: "文案上下跑马灯动效切换",
    component: (
      <TextAnimation words={["Degens", "Flippers", "Collectors", "Sweepers"]} />
    ),
  },
];

function App() {
  return (
    <div className="App">
      {components.map(({ component, title }, i) => (
        <div className="card" key={i}>
          <h3>{title}</h3>
          {component}
        </div>
      ))}
    </div>
  );
}

export default App;
