import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MyPatients } from './pages/MyPatients';
import { MyReports } from './pages/MyReports';

function App() {
  return (
    <div className="w-screen">
      <Header />
      <MyReports />
      <Footer />
    </div>
  );
}

export default App;
