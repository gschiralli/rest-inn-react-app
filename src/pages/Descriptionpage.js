import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

const Descriptionpage = () => {
  const [property, setProperty] = useState({
    _id: 0,
    title: "",
    rentalPrice: 0,
    description: null,
    type: "",
    houseRules: [],
    amenities: [],
    location: "",
    bestSeller: null,
    photoURL: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const URL = `https://intense-spire-46577.herokuapp.com/properties/${id}`;

    fetch(URL)
      .then((response) => response.json())

      .then((json) => {
        setProperty(json.data);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <main className="md:h-3/4 h-auto">
        <div className="flex flex-col md:flex-row md:px-2 md:py-6 md:h-80 h-full">
          <div className="relative md:w-96 w-full flex-none">
            <img
              src={property.photoURL}
              alt={property.title}
              className=" object-cover w-full h-full"
            />
          </div>
          <div className="md:pl-6 pl-2 pt-2 md:pt-0 flex flex-col items-start flex-initial max-h-full md:overflow-auto">
            <h2 className="text-3xl sm:text-1xl font-extrabold">
              {property.title}
            </h2>
            <h4 className="text-xs text-gray-400 underline">
              {property.location} &bull; {property.type}
            </h4>
            <div className="pt-2 space-y-2">
              <h2 className="text-md font-semibold">About this place</h2>
              <p className=" text-sm">{property.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 pt-4 gap-x-10 gap-y-4 md:gap-y-0">
                <div>
                  <h2 className="text-md font-semibold">
                    What this place offers
                  </h2>
                  {property.amenities.map((item) => (
                    <p>- {item}</p>
                  ))}
                </div>
                <div>
                  {property.houseRules ? (
                    <h2 className="text-md font-semibold">House rules</h2>
                  ) : (
                    ""
                  )}
                  {property.houseRules?.map((item) => (
                    <p>
                      {" "}
                      {item ? "-" : ""} {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Descriptionpage;
