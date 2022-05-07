import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import renderDisplay from "../searchutils/jobcardgen";
import Wrapper from "../wrapper";

const getPageData = async (page, params) => {
  const response = await axios.post(`jobs/joblist?page=${page}`, params);
  if (response.data.length) return response.data;
};

let page = 1;

function JobList() {
  const { state } = useLocation();
  const [toDisplay, handleDisplay] = useState(state.result);
  const allJobs = renderDisplay(toDisplay);
  const changePage = async (e) => {
    switch (e.target.textContent) {
      case "Prev":
        if (page > 1) page--;
        handleDisplay(await getPageData(page, state.search));
        break;

      case "Next":
        try {
          page++;
          const result = await getPageData(page, state.search);
          handleDisplay(result);
        } catch (error) {
          page--;
        }
        break;

      default:
        page = 1;
        handleDisplay(await getPageData(page, state.search));
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
