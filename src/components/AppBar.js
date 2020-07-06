import React, { useState } from 'react';

export default function AppBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [option, setOption] = useState('anglicized_name');

  return (
    <div id="addBar">
      <nav>
        <ul className="nav__list">
          <li className="nav__list__item search">
            <input
              value={searchTerm}
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={option} onChange={(e) => setOption(e.target.value)}>
              <option value="anglicized_name">Anglicized Name</option>
              <option value="country">Country</option>
              <option value="region">Region</option>
              <option value="name">Language Name</option>
              <option value="code">Language Code</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
}
