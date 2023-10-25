import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';
function Header (){
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand"  style={{fontSize:"30px"}}>TASK <span style={{color:"red",fontSize:"23px"}}>it</span></a>
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item">
                  <Link to="/Home" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
               
                <li className="nav-item">
                  <Link to="/Login" className="nav-link active" aria-current="page" >
                   Login
                  </Link>
                </li>


    </ul>
  </div>
</nav>
    );
}
export default Header;