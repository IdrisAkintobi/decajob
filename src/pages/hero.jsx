import axios from "axios";
import Wrapper from "../wrapper";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DecajobContext from "../context/DecajobContext";

function Hero() {
  const { BounceLoading: Loading } = useContext(DecajobContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [search, handleSearch] = useState({});

  //Get input query
  const getQuery = (e) => {
    const { name: query, value } = e.target;
    handleSearch({ ...search, [query]: value });
  };

  //Function to get data
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    const response = await axios.post("jobs/joblist", search);
    if (response.data.length)
      return navigate("/joblist", { state: { search, result: response.data } });
  };

  return (
    <Wrapper>
      <div className="banner XXbanner">
        <div className="container">
          <div className="banner-caption">
            <div className="col-md-12 col-sm-12 banner-text">
              <h1>Find Your Dream Job</h1>

              <form onSubmit={submitForm} className="form-horizontal">
                <div className="col-md-4 no-padd">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control right-bor"
                      name="joblist"
                      placeholder="Tittle, Companies"
                      onChange={getQuery}
                    />
                  </div>
                </div>
                <div className="col-md-3 no-padd">
                  <div className="input-group">
                    <select
                      name="category"
                      className="form-control right-bor"
                      onChange={getQuery}
                    >
                      <option>Select Category</option>
                      <option>Technology</option>
                      <option>Finance</option>
                      <option>Manufacturing</option>
                      <option>Marketing</option>
                      <option>Others</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3 no-padd">
                  <div className="input-group">
                    <select
                      name="city"
                      className="form-control"
                      onChange={getQuery}
                    >
                      <option>Choose Region</option>
                      <option>Lagos</option>
                      <option>Edo</option>
                      <option>Abuja</option>
                      <option>Rivers</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 no-padd">
                  <div className="input-group">
                    <button type="submit" className="btn btn-primary">
                      Search Job
                    </button>
                  </div>
                </div>
              </form>
              <Loading status={loading} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default Hero;
