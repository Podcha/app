import "./app.css";
import { Navbar } from "./components/Navbar";
import CreateProfile from "./views/CreateProfile";

const App = () => {
  return (
    <>
    <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <CreateProfile />
    </>
  );
};

export default App;