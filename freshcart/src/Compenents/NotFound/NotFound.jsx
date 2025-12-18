import errorIMg from '../../assets/images/error.svg'
export default function NotFound() {
  return <>
  <picture className='d-flex justify-content-center vh-100 align-items-center'>
    <img src={errorIMg} alt="errorImg" className='w-50' />
  </picture>
  
  
  </>
}
