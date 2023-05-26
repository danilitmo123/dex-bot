import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import PageLayout from "../../layout/Layout";
import useProfiles from "hooks/useProfiles";
import classNames from "classnames";
import profileStatusName from "utils/profileStatusName";
import TokenName from "../TokenName";
import {usePagination} from "../../hooks/usePagination";
import DigitalGraph from "../DigitalGraph";

import "../../assets/styles/pages/_profiles.scss";

import mmpro from '../../assets/icons/mmpro.png'
import busd from '../../assets/icons/busd.png'

const statusClassNames: { [K: string]: string } = {
  waiting: "text-bg-warning",
  active: "text-bg-success",
  stopped: "text-bg-danger"
};

const Profiles = () => {
  const [searchString, setSearchString] = useState("");
  const {profiles} = useProfiles();

  const history = useHistory();

  const [previewHovered, setPreviewHovered] = React.useState(false);

  function toggleHover() {
    setPreviewHovered((v) => !v);
  }

  const _searchString = searchString.trim();

  const _profiles =
    _searchString.length > 0
      ? profiles.filter((el) => {
        return el.name.toLowerCase().includes(_searchString);
      })
      : profiles;

  const profilesList = usePagination(_profiles);

  return (
    <PageLayout>
      <main className="content">
        <div className="page-top">
          <div className="container">
            <div className="page-top__wrap between">
              <h2 className="page-title">Profiles</h2>
              <div className="actions">
                <Link
                  className="add-btn"
                  to="/add-profile"
                >
                  <i className="icon-plus"></i>
                  <span>Add profile</span>
                </Link>
                <div className="search">
              <span className="search__ic">
                <i className="icon-search"></i>
              </span>
                  <input
                    type="text"
                    className="search__input"
                    placeholder="Search"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="t-data">
          <div className="p-table">
            <div className="container">
              <div className="p-table__wrap">
                <table>
                  <thead>
                  <tr>
                    <th scope="col" className="txt-col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Dex</th>
                    <th scope="col">Base Token Name</th>
                    <th scope="col">Quote Token Name</th>
                    <th scope="col">Edit</th>
                  </tr>
                  </thead>
                  <tbody>
                  {profilesList.list.map((item) => (
                    <tr
                      key={item.id}
                      style={{cursor: "pointer"}}
                      onClick={() => {
                        if (!previewHovered) history.push(`/profile/${item.id}`);
                      }}
                    >
                      <td className="txt-col">{item.name}</td>
                      <td>
                    <span
                      className={classNames(
                        "txt-col",
                        statusClassNames[item.status]
                      )}
                    >
                      {profileStatusName[item.status]}
                    </span>
                      </td>
                      <td className="txt-col">{item.dex}</td>
                      <td className="txt-col">
                        <div className="token-it">
                          <img src={mmpro} alt="img"/>
                          <TokenName address={item.baseTokenAddr}/>
                        </div>
                      </td>
                      <td className="txt-col">
                        <div className="token-it">
                          <img src={busd} alt="img"/>
                          <TokenName address={item.quoteTokenAddr}/>
                        </div>
                      </td>
                      <td className="txt-col">
                        <Link
                          to={`/edit-profile/${item.id}`}
                          onMouseEnter={toggleHover}
                          onMouseLeave={toggleHover}
                          className="link-primary"
                        >
                          <i className="icon-edit"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="paginate">
            {profilesList.pagination}
          </div>
        </div>

        <div className="info">
          <div className="container">
            <div className="info__wrap">
              <h3 className="info__title">MVIS® CryptoCompare Digital Assets 100 Small-Cap Index</h3>
              <p className="info__desc">
                The Know Your Client or Know Your Customer (KYC) verification are a set of standards and requirements
                used in the investment and financial services industries to ensure they have sufficient information
                about their clients, their risk profiles, and financial position
              </p>

              <div className="info-table">
                <table>
                  <thead>
                  <tr>
                    <th>Index</th>
                    <th>Last Close</th>
                    <th>Open</th>
                    <th>Last</th>
                    <th>Change</th>
                    <th>Change (1D)</th>
                    <th>Range (1D)</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>
                      <div className="t-checkbox">
                        <input
                          type="checkbox"
                          id="check"
                          defaultChecked
                        />
                        <label htmlFor="check">
                          <span className="line blue"></span>
                          <span className="txt">MVDA</span>
                        </label>
                      </div>
                    </td>
                    <td>6,821.92</td>
                    <td>6,821.92</td>
                    <td>6,821.92</td>
                    <td>0.32%</td>
                    <td>1.78%</td>
                    <td>6,703.99 - 6,875.37</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="t-checkbox">
                        <input
                          type="checkbox"
                          id="check"
                          defaultChecked
                        />
                        <label htmlFor="check">
                          <span className="line green"></span>
                          <span className="txt">MVDALC</span>
                        </label>
                      </div>
                    </td>
                    <td>6,821.92</td>
                    <td>6,821.92</td>
                    <td>6,821.92</td>
                    <td>0.32%</td>
                    <td>1.78%</td>
                    <td>6,703.99 - 6,875.37</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="t-checkbox">
                        <input
                          type="checkbox"
                          id="check"
                          defaultChecked
                        />
                        <label htmlFor="check">
                          <span className="line yellow"></span>
                          <span className="txt">MVDAMC</span>
                        </label>
                      </div>
                    </td>
                    <td>6,821.92</td>
                    <td>6,821.92</td>
                    <td>6,821.92</td>
                    <td>0.32%</td>
                    <td>1.78%</td>
                    <td>6,703.99 - 6,875.37</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="t-checkbox">
                        <input
                          type="checkbox"
                          id="check"
                          defaultChecked
                        />
                        <label htmlFor="check">
                          <span className="line red"></span>
                          <span className="txt">MVDASC</span>
                        </label>
                      </div>
                    </td>
                    <td>6,821.92</td>
                    <td>6,821.92</td>
                    <td>6,821.92</td>
                    <td>0.32%</td>
                    <td>1.78%</td>
                    <td>6,703.99 - 6,875.37</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="graph">
          <div className="container">
            <DigitalGraph></DigitalGraph>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Profiles;
