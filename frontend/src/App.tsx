import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  ActionFunction,
  redirect,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Index from "./pages/Index";
import BathroomShow from "./pages/BathroomShow";
import NewBathroomForm from "./pages/NewBathroomForm";
import NotFound from "./pages/NotFound";
import indexLoader from "./loaders/indexLoader";
import showLoader from "./loaders/showLoader";
import ShowBathroomError from "./pages/ShowBathroomError";

export const createBathroom: ActionFunction = async ({ request }) => {
  // gather data from form
  const data = await request.formData();
  // Submission for request body
  const submission = {
    // to add: lat and long
    name: data.get("name"),
    address: data.get("address"),
    description: data.get("description"),
    operator: data.get("operator"),
    openingHours: data.get("openingHours"),
    gender: data.get("gender"),
    wheelchairBuildingAccess: data.get("wheelchairBuildingAccess"),
    wheelchairToiletAccess: data.get("wheelchairToiletAccess"),
    wheelchairDescription: data.get("wheelchairDescription"),
    fee: data.get("fee"),
    child: data.get("child"),
  };
  console.log(submission);
  // validation
  if (
    typeof submission.description === "string" &&
    submission.description.length < 10
  ) {
    return { error: "Description must be over 10 chars long" };
  }
  // Send POST request to API
  try {
    const response = await fetch("http://localhost:8000/bathrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });
    if (!response.ok) {
      throw new Error("Network response failed");
    }
    const result = await response.json();
    console.log("Success:", result);
    return redirect("/bathrooms");
  } catch (error) {
    console.error("Error submitting form:", error);
    return { error: "Failed to create bathroom" };
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      <Route path="/bathrooms">
        <Route index element={<Index />} loader={indexLoader} />
        <Route
          path=":id"
          element={<BathroomShow />}
          loader={showLoader}
          errorElement={<ShowBathroomError />}
        />
        <Route
          path="new"
          element={<NewBathroomForm />}
          action={createBathroom}
        />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
