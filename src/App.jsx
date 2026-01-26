
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
import FormProcessingPage from "./blankpage/FormProcessingPage";

import CRCA from "./crc-form/crc_a"
import CRCB from "./crc-form/crc_b"
import CRCC from "./crc-form/crc_c"
import CRCD from "./crc-form/crc_d"
import CRCE from "./crc-form/crc_e"
import CRCF from "./crc-form/crc_f"
import CRCG from "./crc-form/crc_g"
import CRCH from "./crc-form/crc_h"
import CRCI from "./crc-form/crc_i"
import CRCJ from "./crc-form/crc_j"
import PFASForm from "./pfasform/pfasform"
import PFASPage from "./pfaspage/pfaspage"

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

        <Route
          path="/form-processing"
          element={
            <>
              <FormProcessingPage />
              <Footer />
            </>
          }
        />

        <Route
        path="/crc001"
        element={
          <>
            <CRCA/>
            <Footer />
          </>
        }
        />

        <Route
        path="/crc002"
        element={
          <>
            <CRCB/>
            <Footer />
          </>
        }

        /><Route
        path="/crc003"
        element={
          <>
            <CRCC/>
            <Footer />
          </>
        }

        /><Route
        path="/crc004"
        element={
          <>
            <CRCD/>
            <Footer />
          </>
        }

        /><Route
        path="/crc005"
        element={
          <>
            <CRCE/>
            <Footer />
          </>
        }

        /><Route
        path="/crc006"
        element={
          <>
            <CRCF/>
            <Footer />
          </>
        }

        /><Route
        path="/crc007"
        element={
          <>
            <CRCG/>
            <Footer />
          </>
        }

        /><Route
        path="/crc008"
        element={
          <>
            <CRCH/>
            <Footer />
          </>
        }

        /><Route
        path="/crc009"
        element={
          <>
            <CRCI/>
            <Footer />
          </>
        }

        /><Route
        path="/crc010"
        element={
          <>
            <CRCJ/>
            <Footer />
          </>
        }
        />

        <Route
        path="/pfasform"
        element={
          <>
            <PFASForm/>
            <Footer />
          </>
        }
        />

        <Route
        path="/pfaspage"
        element={
          <>
            <PFASPage/>
            <Footer />
          </>
        }
        />

      </Routes>

      

    </>
  );
}

export default App;
