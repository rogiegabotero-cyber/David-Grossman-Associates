
import "./App.css";
import Homepage from "./pages/home_page";
import Header from "./components/header";
import Expertise from "./pages/expertise";
import AboutUs from "./pages/aboutus";
import News from "./pages/news";
import Team from "./pages/team";
import Conctact from "./pages/contacts";
import Footer from "./components/footer";
import StayConnected from "./components/stay_connected";
import AboutSection from "./about/about_section";
import PracticeArea from "./practice/practice_area"
import ContactPage from "./contact/contact_page"
import NewPage from "./news/news_page"
import ExtendedNews from "./news/expanded_news"
import ExtendedNews2 from "./news/expanded_news2"
import ExtendedNews3 from "./news/expanded_news3"
import Attorneys from "./attorneys/attorneys";
import ClaimForm from "./vga-form/ClaimForm"; 
import FileClaimPage from "./fileclaim_page/file_claim_page";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Homepage />
              <Expertise />
              <AboutUs />
              <News />
              <Team />
              <Conctact />
              <StayConnected />
              <Footer />
            </>
          }
        />

        <Route
          path="/about_section"
          element={
            <>
              <AboutSection />
              <Footer />
            </>
          }
        />

        <Route
          path="/practice_area"
          element={
            <>
              <PracticeArea />
              <Footer />
            </>
          }
        />
        
        <Route
          path="/claim-form"
          element={
            <>
              <ClaimForm />
              <Footer />
            </>
          }
        />

        
        <Route
          path="/contact_page"
          element={
            <>
              <ContactPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/file_claim_page"
          element={
            <>
              <FileClaimPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/news_page"
          element={
            <>
              <NewPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/extended_news"
          element={
            <>
              <ExtendedNews />
              <Footer />
            </>
          }
        />

        <Route
          path="/expanded_news2"
          element={
            <>
              <ExtendedNews2 />
              <Footer />
            </>
          }
        />

        <Route
          path="/expanded_news3"
          element={
            <>
              <ExtendedNews3 />
              <Footer />
            </>
          }
        />

        <Route
          path="/attorneys"
          element={
            <>
              <Attorneys />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
