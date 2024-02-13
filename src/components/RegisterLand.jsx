import React, { useState } from 'react'
import '../css/RegisterLand.css'

const RegisterLand = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [landDetails, setLandDetials] = useState({
    state:"", district:"", city:"", propertyId:"", surveyNo:"", owner:"", marketValue:"", size:""
  }) 

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setLandDetials({...landDetails, [name]:value});
  }

  const handleOnClick = async () =>{
    console.log(account);
    console.log(landDetails);
    await contract.registerLand(landDetails.state, landDetails.district, landDetails.city, landDetails.propertyId, landDetails.surveyNo, landDetails.owner, landDetails.marketValue, landDetails.size, {
      from: account
    })
    console.log(account);
    console.log(landDetails)
    setLandDetials({state:"", district:"", city:"", propertyId:"", surveyNo:"", owner:"", marketValue:"", size:""})
  }



  return (
    <div className='w-8/12 flex flex-col bg-richblack-800 mx-auto rounded-lg'>
    <h1  className='text-richblack-25 font-semibold text-lg  mx-auto mt-2 mb-4 p-4 rounded-md'>Register Land</h1>
      <div className='flex items-center justify-center gap-16  mx-10'>

         {/* left part */}
         
            <form method='POST' className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label className='lable-style'>State</label>
                    <input type="text" className="form-style" name="state" placeholder="Enter State" 
                    autoComplete="off" value={landDetails.state} onChange={onChangeFunc}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='lable-style'>District</label>
                    <input type="text" className="form-style" name="district" placeholder="Enter district" 
                    autoComplete="off" value={landDetails.district} onChange={onChangeFunc}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='lable-style'>City</label>
                    <input type="text" className="form-style" name="city" placeholder="Enter city" 
                    autoComplete="off" value={landDetails.city} onChange={onChangeFunc}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='lable-style'>Property ID</label>
                    <input type="number" className="form-style" name="propertyId" placeholder="Enter property ID" 
                    autoComplete="off" value={landDetails.propertyId} onChange={onChangeFunc}/>
                </div>
            </form>
        

        {/* right part*/}
      
          <form method='POST' className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <label className='lable-style'>Survey Number</label>
                <input type="number" className="form-style" name="surveyNo" placeholder="Enter survey number" 
                autoComplete="off" value={landDetails.surveyNo} onChange={onChangeFunc}/>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='lable-style'>Owner Address</label>
                <input type="text" className="form-style" name="owner" placeholder="Enter owner address" 
                autoComplete="off" value={landDetails.owner} onChange={onChangeFunc}/>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='lable-style'>Market Value</label>
                <input type="number" className="form-style" name="marketValue" placeholder="Enter market value" 
                autoComplete="off" value={landDetails.marketValue} onChange={onChangeFunc}/>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='lable-style'>Size</label>
                <input type="number" className="form-style" name="size" placeholder="Enter size (sq. ft.)" 
                autoComplete="off" value={landDetails.size} onChange={onChangeFunc}/>
            </div>
          </form>
        
      </div>
      <button className='btn-style mx-auto mt-10 mb-6' onClick={handleOnClick}>Register</button>
    </div>
  )
}

export default RegisterLand