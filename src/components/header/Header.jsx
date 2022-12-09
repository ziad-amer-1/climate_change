import "./Header.css"
import Logo from "../../assets/logo.png"

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="group-number">
        <h3>G: 19328</h3>
      </div>
    </header>
  )
}

export default Header
