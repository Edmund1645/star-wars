import React, { useState } from 'react';
// import { Column } from 'react-table';

import styles from '../assets/css/modules/GenderFilter.module.css';

interface Props {
  filter: any;
  setFilter: any;
}
const genders = ['Male', 'Female', 'Hermaphrodite', 'None', 'N/A'];

const GenderFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <div className={styles.gender_filter_container}>
      <p>
        Showing results for <strong>{filter || 'All genders'}</strong>...
      </p>

      <div className={styles.movie_dropdown_container}>
        <button onClick={toggleFilter} className={styles.gender_picker}>
          Filter by gender ⬇️
        </button>

        {showFilter && (
          <ul className={styles.gender_menu}>
            <li className={styles.gender_menu_item}>
              <button
                onClick={() => {
                  setFilter('');
                  setShowFilter(false);
                }}
              >
                All
              </button>
            </li>

            {genders.map((gender, index: number) => (
              <li className={styles.gender_menu_item} key={index}>
                <button
                  onClick={() => {
                    setFilter(gender);
                    setShowFilter(false);
                  }}
                >
                  {gender}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GenderFilter;
