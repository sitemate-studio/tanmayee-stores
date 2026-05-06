import { Toaster } from "@/components/ui/toaster";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import PageNotFound from "@/lib/PageNotFound";

import StoreLayout from "@/components/store/StoreLayout";

import Home from "@/pages/Home";
import Collections from "@/pages/Collections";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<StoreLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/:categorySlug/:productSlug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>

      <Toaster />
    </>
  );
}

export default App;