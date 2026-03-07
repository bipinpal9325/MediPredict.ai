import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Dashboard from "./components/pages/Dashboard";
import DiabetesPrediction from "./components/pages/DiabetesPrediction";
import HeartDiseasePrediction from "./components/pages/HeartDiseasePrediction";
import CovidPrediction from "./components/pages/CovidPrediction";
import CancerPrediction from "./components/pages/CancerPrediction";
import Results from "./components/pages/Results";
import Pricing from "./components/pages/Pricing";
import Contact from "./components/pages/Contact";
import Auth from "./components/pages/Auth";
import NotFound from "./components/pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; 
import ProtectedFeature from "./components/ProtectedFeature";
import { PREDICTION_FEATURES } from "./utils/featureAccess";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "auth", Component: Auth },
      { path: "pricing", Component: Pricing },
      { path: "contact", Component: Contact },
      { path: "about", Component: About },
      {
        Component: ProtectedRoute,
        children: [
          { path: "dashboard", Component: Dashboard },
          { path: "results", Component: Results },
          { 
            path: "predict/diabetes", 
            element: (
              <ProtectedFeature featureName={PREDICTION_FEATURES.DIABETES}>
                <DiabetesPrediction />
              </ProtectedFeature>
            )
          },
          { 
            path: "predict/heart-disease", 
            element: (
              <ProtectedFeature featureName={PREDICTION_FEATURES.HEART_DISEASE}>
                <HeartDiseasePrediction />
              </ProtectedFeature>
            )
          },
          { 
            path: "predict/covid", 
            element: (
              <ProtectedFeature featureName={PREDICTION_FEATURES.COVID}>
                <CovidPrediction />
              </ProtectedFeature>
            )
          },
          { 
            path: "predict/cancer", 
            element: (
              <ProtectedFeature featureName={PREDICTION_FEATURES.CANCER}>
                <CancerPrediction />
              </ProtectedFeature>
            )
          },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);