import { useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const Trip = () => {
  // Store form data efficiently
  const [formData, setFormData] = useState({
    selectedPlace: "",
    travelDay: "",
    budget: "",
    travelGroup: "",
    travelStyle: "",
  });

  let autocompleteRef = null;

  // Handle Google Places selection
  const handlePlaceChanged = () => {
    if (autocompleteRef) {
      const place = autocompleteRef.getPlace();
      setFormData((prev) => ({
        ...prev,
        selectedPlace: place.formatted_address || "Unknown location",
      }));
      console.log("Selected place:", place);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form to backend (example API request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://your-api.com/saveTrip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) console.log("Trip data saved successfully!");
    } catch (error) {
      console.error("Error saving trip data:", error);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 bg-gray-100 rounded-lg shadow-lg p-6">
        <h2 className="font-bold text-3xl text-blue-700 text-center">
          Tell Us Your Travel Preference
        </h2>
        <p className="text-lg text-gray-800 text-center mt-4 leading-relaxed">
          Your dream getaway starts here! Select your **destination, budget, travel style**, and let AI plan the perfect trip for you.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200 mt-10">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Plan Your Perfect Trip 🌍✈️</h2>

        {/* Destination Input with Google Places Autocomplete */}
        <div className="mb-5">
          <label htmlFor="destination" className="block mb-2 text-sm font-medium text-gray-900">Where would you like to go?</label>
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} libraries={["places"]}>
            <Autocomplete onLoad={(autocomplete) => (autocompleteRef = autocomplete)} onPlaceChanged={handlePlaceChanged}>
              <input type="text" placeholder="Enter a location"
                className="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
              />
            </Autocomplete>
          </LoadScript>
        </div>

        {/* Travel Days Input */}
        <div className="mb-5">
          <label htmlFor="travelDay" className="block mb-2 text-sm font-medium text-gray-900">How many days are you planning your trip?</label>
          <input type="text" id="travelDay" name="travelDay"
            className="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
            required placeholder="Ex: 3" value={formData.travelDay} onChange={handleChange}
          />
        </div>

        {/* Budget Selection */}
        <div className="mb-5">
          <label className="block mb-2 text-lg font-semibold text-gray-900">Choose Your Budget:</label>
          <select name="budget"
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            value={formData.budget} onChange={handleChange} required
          >
            <option value="" disabled selected>Select your budget</option>
            <option value="budget">💰 Budget-Friendly</option>
            <option value="moderate">💳 Moderate</option>
            <option value="luxury">🌟 Luxury</option>
          </select>
        </div>

        {/* Travel Group Selection */}
        <div className="mb-5">
          <label className="block mb-2 text-lg font-semibold text-gray-900">Who Are You Traveling With?</label>
          <select name="travelGroup"
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            value={formData.travelGroup} onChange={handleChange} required
          >
            <option value="" disabled selected>Select your travel group</option>
            <option value="solo">🎒 Solo Traveler</option>
            <option value="friends">👫 With Friends</option>
            <option value="couple">💑 Couple Trip</option>
            <option value="family">👨‍👩‍👧‍👦 Family Vacation</option>
          </select>
        </div>

        {/* Travel Style Selection */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Preferred Travel Style:</label>
          <select name="travelStyle"
            className="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3 focus:ring-blue-500 focus:border-blue-500"
            value={formData.travelStyle} onChange={handleChange} required
          >
            <option value="" disabled selected>Select your preference</option>
            <option value="adventure">🌲 Adventure & Outdoors</option>
            <option value="beach">🏖️ Relaxing Beach Getaway</option>
            <option value="city">🏙️ City Exploration</option>
            <option value="cultural">🏛️ Cultural & Historical</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-lg px-6 py-3 shadow-md transition-all"
          >
            Find My Perfect Trip 🚀
          </button>
        </div>
      </form>
    </div>
  );
};



export default Trip;
