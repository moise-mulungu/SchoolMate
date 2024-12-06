import '../style.css'
export default function Header() {
  return (
    <div className="container text-center my-2">
      <img
        className="img-fluid rounded-circle mb-2 custom-width"
        src="/smart-school-logo.png"
        alt="smart school logo"
      />
      <h1 className="display-2 text-color">Smart School</h1>
    </div>
  )
}
