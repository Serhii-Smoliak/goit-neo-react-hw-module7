import { useSelector, useDispatch } from "react-redux";

import styles from "./SearchBox.module.css";
import { selectNameFilter } from "../../redux/filtersSlice";
import { changeFilter } from "../../redux/filtersSlice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const value = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <label className={styles.label}>Find contacts by name</label>
      <div className={styles.searchWrapper}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search contacts..."
        />
        <span className={styles.searchIcon}></span>
      </div>
    </div>
  );
}
