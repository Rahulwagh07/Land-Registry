import React from 'react'

const DisplayLandDetails = (props) => {
  return (
    <>
    {
          <div className=' w-8/12  p-8 rounded-md mx-auto mt-7 text-richblack-25 form-style'>
            <div className='flex gap-16 ml-8'>
              
                 <div className='flex flex-col text-richblack-50 gap-4 '>
                    <p>Owner: {props.owner}</p>
                    <p> Survey Number: {props.surveyNo}</p>
                    <p> Property ID: {props.propertyId}</p>
                    <p>Market Value: {props.marketValue}</p>
                 </div>
                 <div className='flex flex-col text-richblack-50 gap-4'>
                  <p>State: {props.state}</p>
                  <p>District: {props.district}</p>
                  <p>City: {props.city}</p>
                  <p>Size: {props.sqft} sq. ft.</p>
                 </div>
            </div>
            {
            (props.available) ? 
              <button className='btn-style mx-auto'>Marked Available</button>
              :
              <button className='btn-style mx-auto mt-4' onClick={() => {props.markAvailable(props.index)}} ><b>Mark Available</b></button>
            }
          </div> 
    }
    </>
  )
}

export default DisplayLandDetails