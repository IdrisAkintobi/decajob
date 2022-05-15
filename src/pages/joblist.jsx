import axios from "axios";
import Wrapper from "../wrapper";
import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import renderDisplay from "../searchutils/jobcardgen";
import DecajobContext from "../context/DecajobContext";

const getPageData = async (page, params) => {
  const response = await axios.post(`jobs/joblist?page=${page}`, params);
  if (response.data.length) return response.data;
};

let page = 1;

function JobList() {
  const { BarLoading: Loading } = useContext(DecajobContext);
  let [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const { result, search } = state;
  const [toDisplay, handleDisplay] = useState(result);
  const allJobs = renderDisplay(toDisplay);

  //Effect to hide loading bar
  useEffect(() => {
    setLoading(false);
  }, [toDisplay]);

  const changePage = async (e) => {
    //Show loading bar
    setLoading(true);
    switch (e.target.textContent) {
      case "Prev":
        if (page > 1) page--;
        handleDisplay(await getPageData(page, search));
        break;

      case "Next":
        try {
          page++;
          handleDisplay(await getPageData(page, search));
        } catch (error) {
          page--;
          setLoading(false);
        }
        break;

      default:
        page = 1;
        handleDisplay(await getPageData(page, search));
        break;
    }
  };

  return (
    <Wrapper>
      <div className="wrapper joblist-page">
        <section className="inner-header-title">
          <div className="container">
            <h1>Browse Jobs</h1>
          </div>
        </section>
        <div className="clearfix"></div>
        <section className="brows-job-category">
          <div className="container">
            <div className="row extra-mrg">{allJobs}</div>
          </div>
        </section>
      </div>
      <div className="clearfix"></div>
      <Loading status={loading} />
      <nav aria-label="Page navigation">
        <ul className="pagination pagination-sm">
          <li className="page-item">
            <button
              className="btn btn-secondary page-link btn-page"
              onClick={changePage}
            >
              Prev
            </button>
          </li>
          <li className="page-item">
            <button
              className="btn btn-dark page-link btn-page"
              onClick={changePage}
            >
              <i className="fa fa-home"></i>
            </button>
          </li>
          <li className="page-item">
            <button
              className="btn btn-secondary page-link btn-page"
              onClick={changePage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
}
export default JobList;
