import { useEffect, useState } from "react";
import { TbUpload } from "react-icons/tb";
import { FaStar, FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import Amenities from "../components/Amenities";
import { amenitiesList } from "../utils/data";
import FormSection from "../components/FormSection";
import { customFetch } from "../utils/customFetch";
import { useNavigate, useParams } from "react-router-dom";
import AccountNavbar from "../components/AccountNavbar";
import { toast } from "react-toastify";

const AccommodationForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [policies, setPolicies] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    customFetch(`api/v1/booking/accommodations/${id}`).then(({ data }) => {
      const {
        title,
        address,
        images,
        description,
        amenities,
        policies,
        checkIn,
        checkOut,
        maxGuests,
        price,
      } = data;
      setTitle(title);
      setAddress(address);
      setImages(images);
      setDescription(description);
      setAmenities(amenities);
      setPolicies(policies);
      setCheckIn(checkIn);
      setCheckOut(checkOut);
      setMaxGuests(maxGuests);
      setPrice(price);
    });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accommodationData = {
      title,
      address,
      images,
      description,
      amenities,
      policies,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    // if there's an id, it means we're updating the accomodation
    if (id) {
      await customFetch.put("/api/v1/booking/accommodations", {
        id,
        ...accommodationData,
      });
      toast.success("All changes have been saved!");
    } else {
      // if there's no id, we're creating a new accommodation
      await customFetch.post(
        "/api/v1/booking/accommodations",
        accommodationData
      );
      navigate("/account/accommodations");
    }
  };

  const addImageFromUrl = async (event) => {
    event.preventDefault();
    try {
      const { data } = await customFetch.post("/api/v1/upload/uploadFromUrl", {
        link: imageUrl,
      });
      setImages((previous) => {
        return [...previous, data];
      });
      setImageUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImageFromDevice = async (event) => {
    try {
      const files = event.target.files;
      const data = new FormData();

      // Appending each file to the FormData object
      for (let i = 0; i < files.length; i++) {
        data.append("images", files[i]);
      }
      // Sending the form data to the server
      const { data: fileNames } = await customFetch.post(
        "/api/v1/upload/uploadFromDevice",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImages((previous) => {
        return [...previous, ...fileNames];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAmenitiesCheckbox = (event) => {
    const { name, checked } = event.target;
    setAmenities(
      (previous) =>
        checked
          ? [...previous, name] // Add amenity if checked
          : previous.filter((item) => item !== name) // Remove amenity if unchecked
    );
  };

  const removeImage = (imageName) => {
    const newImages = images.filter((image) => imageName !== image);
    setImages(newImages);
  };

  const selectAsMainImage = (imageName) => {
    const unselectedImages = images.filter((image) => imageName !== image);
    const newImages = [imageName, ...unselectedImages];
    setImages(newImages);
  };

  return (
    <div>
      <AccountNavbar />
      <form onSubmit={handleSubmit}>
        {/* ==== Title ==== */}
        <FormSection
          title="Title"
          subTitle="Think of something short and catchy!"
        >
          <input
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Your title goes here..."
          />
        </FormSection>
        {/* ==== Address ==== */}
        <FormSection
          title="Address"
          subTitle="Try to be as precise as possible."
        >
          <input
            type="text"
            required
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Your address goes here..."
          />
        </FormSection>
        {/* ==== Description ==== */}
        <FormSection
          title="Description"
          subTitle="Describe us how wonderful the place is!."
        >
          <textarea
            value={description}
            required
            onChange={(event) => setDescription(event.target.value)}
            className="py-8"
            placeholder="You description goes here..."
          />
        </FormSection>
        {/* ==== Amenities ==== */}
        <FormSection
          title="Amenities"
          subTitle="Select all the amenities your place has to offer."
        >
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {amenitiesList.map((amenity) => {
              return (
                <Amenities
                  handleAmenitiesCheckbox={handleAmenitiesCheckbox}
                  key={amenity.id}
                  amenity={amenity}
                  selected={amenities}
                />
              );
            })}
          </div>
        </FormSection>
        {/* ==== Policies ==== */}
        <FormSection title="Policies" subTitle="Tell us about your policies.">
          <textarea
            required
            className="py-8"
            value={policies}
            onChange={(event) => setPolicies(event.target.value)}
            placeholder="You policies goes here..."
          />
        </FormSection>
        {/* ==== Images ==== */}
        <FormSection title="Photos" subTitle="The more photos the better!">
          {/* Upload from URL */}
          <div className="flex gap-2">
            <input
              type="text"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="Add images from URL (.JPG)"
            />
            <button
              onClick={addImageFromUrl}
              className="bg-slate-200 px-4 rounded-md w-auto hover:bg-cyan-600 duration-300 hover:text-white"
            >
              Add&nbsp;Image
            </button>
          </div>
          {/* List of images */}
          <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {images.length > 0 &&
              images.map((image, index) => {
                return (
                  <div className="h-32 flex relative" key={index}>
                    <img
                      className="w-full object-cover rounded-md"
                      src={`http://localhost:4000/uploads/${image}`}
                    />
                    {/* Remove image button */}
                    <button
                      onClick={() => removeImage(image)}
                      className="absolute bg-black bg-opacity-70 text-white p-1 rounded-full bottom-1 right-1 cursor-pointer hover:scale-110 duration-200"
                    >
                      <FaRegTrashAlt className="h-4 w-4" />
                    </button>
                    {/* Select as main image button */}
                    <button
                      onClick={() => selectAsMainImage(image)}
                      className="absolute bg-black bg-opacity-70 text-white p-1 rounded-full bottom-1 left-1 cursor-pointer hover:scale-110 duration-200"
                    >
                      {image === images[0] ? (
                        <FaStar className="h-4 w-4" />
                      ) : (
                        <FaRegStar className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                );
              })}
            {/* Upload from device */}
            <label className="h-32 flex items-center justify-center gap-2 cursor-pointer border bg-transparent rounded-md p-8 text-2xl text-slate-600 hover:bg-cyan-600 duration-300 hover:text-white">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={uploadImageFromDevice}
              />
              <TbUpload />
              Upload
            </label>
          </div>
        </FormSection>
        {/* ==== Check-in, Checkout, Number of Guests and Price ==== */}
        <FormSection
          title="Check-in & Checkout"
          subTitle="What time can the guests arrive and leave?"
        >
          <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mt-2 ml-0.5">Check-in time:</h3>
              <input
                type="time"
                required
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                placeholder="After 3:00 PM"
              />
            </div>
            <div>
              <h3 className="mt-2 ml-0.5">Checkout time:</h3>
              <input
                type="time"
                required
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
                placeholder="Before 11:00 AM"
              />
            </div>
            <div>
              <h3 className="mt-2 ml-0.5">Max number of guests:</h3>
              <input
                type="number"
                min={1}
                value={maxGuests}
                onChange={(event) => setMaxGuests(event.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 ml-0.5">Price per night:</h3>

              <input
                type="number"
                min={0}
                required
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder=""
              />
            </div>
          </div>
        </FormSection>

        <div className="my-4">
          <button className="primary !rounded-md">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AccommodationForm;
