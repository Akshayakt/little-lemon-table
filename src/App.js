import "./App.css";

import Hero from "./components/hero";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
