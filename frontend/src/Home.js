import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './Home.css'
import { Link, useNavigate } from 'react-router-dom';
function Home(){
    const navigate = useNavigate();
    const handleregister = () => {
        debugger;
      navigate('/Signup');
  };
  const handlelogin = () => {
    navigate('/Login');
};

    return(
        <div className="jumbotron jumbotron-fluid home">
  <div className="container">
    <h1 class="display-5 div">Now Working is Easy !!</h1>
    <h6 class="lead">Assign, Arrange, Track, Manage tasks conveniently ......!!!</h6>
    <div class="button-container">
      <Link to="/Signup"  onClick={handleregister} class="transparent-button">Register</Link>
      <Link to="/login"   onClick={handlelogin}   class="transparent-button">Login</Link>
    </div>
  </div>
</div>

    )
}
export default Home;