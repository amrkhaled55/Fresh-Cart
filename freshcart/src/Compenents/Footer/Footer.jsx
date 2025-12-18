import amazonImg from "../../assets/images/amazon-pay.png";
import amrican from "../../assets/images/American-Express-Color.png";
import appStore from "../../assets/images/get-apple-store.png";
import playStore from "../../assets/images/get-google-play.png";
import masterCard from "../../assets/images/mastercard.webp";
import payPalCard from "../../assets/images/paypal.png";
export default function Footer() {
  return <div className='theFooter p-3 mt-4' style={{backgroundColor:"#F8F9FA"}}>
<div className="container-fluid">
  <h4>Get The Fast Store App</h4>
  <p>We Will Send You a Link, Open it on Your Phone to download the app</p>
<div className="row border-bottom p-2 g-2">
  <div className="col-8">
    <input
      type="email"
      className="form-control"
      placeholder="Enter Your email address"
    />
  </div>

  <div className="col-4">
    <button style={{fontSize:"13px"}} className="btn btn-success w-100">
      Share App Link
    </button>
  </div>
</div>

<div className="row justify-content-between align-items-center g-1">
  <div className="col-12 col-md-10">
    <div className="paymentImgs d-flex flex-wrap  align-items-center mt-3">
      <h6 className="me-2">Payment partners</h6>
      <div className="theImgs">
       <img style={{maxWidth:"36px",marginLeft:"10px"}} src={amrican} alt="amrican card"/>
       <img style={{maxWidth:"36px",marginLeft:"10px"}} src={masterCard} alt="master card"/>
       <img style={{maxWidth:"36px",marginLeft:"10px"}} src={payPalCard} alt="paypal card"/>
       <img style={{maxWidth:"36px",marginLeft:"10px"}} src={amazonImg} alt="paypal card"/>
      </div>
    </div>
  </div>
  <div className="col-12 col-md-2">
    <div className="thImgsStore">
      <img style={{width:"60px"}} src={appStore} alt="app store" />
      <img style={{width:"60px"}} src={playStore} alt="play store" />
    </div>
  </div>
</div>

</div>
  
  
  </div>
}
