const Amenities = ({ amenity, selected, handleAmenitiesCheckbox }) => {
  const { title, icon } = amenity;
  return (
    <label className="border p-4 flex items-center gap-1.5 rounded-md cursor-pointer">
      <input
        type="checkbox"
        checked={selected.includes(title)}
        name={title}
        onChange={handleAmenitiesCheckbox}
      />
      {icon}
      <span>{title}</span>
    </label>
  );
};

export default Amenities;
