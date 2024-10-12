"use client";
import { useState, useEffect } from 'react';

export default function EstimatePriceForm() {
  const [sqft, setSqft] = useState(1000);
  const [bhk, setBHK] = useState(2);
  const [bath, setBath] = useState(2);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get_location_names')
      .then(response => response.json())
      .then(data => setLocations(data.locations));
  }, []);

  const handleSubmit = () => {
    fetch('http://127.0.0.1:5000/predict_home_price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bath,
        location: location,
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => setEstimatedPrice(data.estimated_price))
      .catch(error => console.error('Error estimating price:', error));
  };

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4">Estimate Your Home Price</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Area (Square Feet)</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Bedroom</label>
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5].map(value => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="bhk"
                checked={bhk === value}
                onChange={() => setBHK(value)}
                className="mr-2 leading-tight"
              />
              <span className="text-sm">{value}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Bath</label>
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5].map(value => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="bath"
                checked={bath === value}
                onChange={() => setBath(value)}
                className="mr-2 leading-tight"
              />
              <span className="text-sm">{value}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option disabled value="">Choose a Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        onClick={handleSubmit}
      >
        Estimate Price
      </button>

      {estimatedPrice && (
        <div className="mt-4 bg-yellow-200 p-4 rounded">
          <h2 className="text-center text-xl font-semibold">{estimatedPrice} Lakh</h2>
        </div>
      )}
    </form>
  );
}
