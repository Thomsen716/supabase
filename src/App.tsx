import { Routes, Route, Outlet } from "react-router";

const Home = () => <h1>Hjem</h1>;
const About = () => <h1>Om os</h1>;

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <Outlet /> {/* Under-ruter vises her */}
  </div>
);

const DashboardHome = () => <h2>Velkommen til Dashboard</h2>;
const Stats = () => <h2>Statistik</h2>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome />} /> {/* Standardvisning */}
        <Route path="stats" element={<Stats />} />
      </Route>
    </Routes>
  );
}

export default App;
