import { FaGripHorizontal } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import "./filter2.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBySearch, sortProducts } from "../../redux/features/filterSlice";

export const Filter2 = () => {
  const { products } = useSelector((store: RootState) => store.filter);

  const [search, setSearch] = useState("")
  const [sortList, setSortList] = useState("latest");
 
  const dispatch = useDispatch()
  const handleSortChange = (e:any) => {
    setSortList(e.target.value)
    dispatch(sortProducts({sortProducts:products,sort:e.target.value}))
    console.log(sortList,products)
  } 

  const handleSearch = () => {
    dispatch(filterBySearch({searchProducts:products, search}))
  }

  return (
    <div className="product-list">
      <div className="product-list-left">
        <FaGripHorizontal />
        <span className="product-list-left-text">
          {products.length === 1
            ? `${products.length} product found`
            : `${products.length} products found`}
        </span>
      </div>
      <div className="product-list-middle">
        <input type="text" placeholder="Search..." value={search}
        onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={handleSearch}>
          <AiOutlineSearch size={20} />
        </button>
      </div>
      <div className="product-list-right">
        <span className="product-list-right-text">Sort by:</span>
        <select
          className="product-list-right-dropdown"
          value={sortList}
          onChange={handleSortChange}
        >
          <option value="latest">Latest</option>
          <option value="highest-lowest">Highest-Lowest</option>
          <option value="lowest-highest">Lowest-Highest</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
    </div>
  );
};
