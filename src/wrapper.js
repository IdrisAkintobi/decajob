import { Link } from "react-router-dom";
function Wrapper(props) {
  const user = localStorage.getItem("user");
  const NavItem = user ? (
    <>
      <li className="nav-text">{JSON.parse(user).name}</li>
      <li className="left-br">
        <Link
          to={"/login"}
          className="signin"
          onClick={() => localStorage.removeItem("user")}
        >
          Sign Out
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to={"/signup"}>
          <i className="fa fa-pencil" aria-hidden="true"></i>SignUp
        </Link>
      </li>
      <li className="left-br">
        <Link to={"/login"} className="signin">
          Sign In
        </Link>
      </li>
    </>
  );
  return (
    <>
      <div className="wrapper"></div>
      <nav className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
        <div className="container">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#navbar-menu"
          >
            <i className="fa fa-bars"></i>
          </button>
          <div className="navbar-header">
            <Link to={"/"} className="navbar-brand">
              <img
                src="assets/img/logo-white.png"
                className="logo logo-display"
                alt=""
              />
              <img
                src="assets/img/logo-white.png"
                className="logo logo-scrolled"
                alt=""
              />
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbar-menu">
            <ul
              className="nav navbar-nav navbar-right"
              data-in="fadeInDown"
              data-out="fadeOutUp"
            >
              {NavItem}
            </ul>
          </div>
        </div>
      </nav>
      <div className="clearfix"></div>
      {props.children}
      <div className="clearfix"></div>
      <footer className="footerLast">Copyright &copy; iDris</footer>
      <div className="clearfix"></div>
    </>
  );
}
export default Wrapper;
