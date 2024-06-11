import PropTypes from "prop-types";
export const SearchBar = ({ handleChange }) => {
  return (
    <div className="w-full flex justify-center max-w-[2000px]">
      <input
        type="text"
        name="search"
        placeholder="Find a recipe"
        id="search"
        onChange={handleChange}
        className="pl-5 py-3 border-[3px] rounded-full focus:outline-none focus:border-blue-500 w-3/4 xl:w-1/2 border-black"
      />
    </div>
  );
};
SearchBar.propTypes = {
  handleChange: PropTypes.func,
};
