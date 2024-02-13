import React from 'react'

const DisplayExploreResult = (props) => {
  return (
    <div className=''>
    {
        (props.propertyId != 0) ?   // propertyId != 0 means we got a result while exploring.
          (
            <div className=' w-8/12  p-8 rounded-md mx-auto mt-7 text-richblack-25 form-style flex-col gap-2'>
              <p><b>Owner:</b> {props.owner}</p>
              <p><b>Survey Number:</b> {props.surveyNo}</p>
              <p><b>Property ID:</b> {props.propertyId}</p>
              <p><b>Market Value:</b> {props.marketValue}</p>
              <p><b>Size:</b> {props.sqft} sq. ft.</p>

              {
              (props.available) ?  // if land is marked for sale.
                (
                  (props.isAdmin || props.isOwner) ?  // isOwner means "is Owner exploring its own land?"
                    (
                      // if owner is exploring its own land, then, owner CANNOT request its own land, hence "Marked for sale" will be displayed only.
                      <button className='btn-style'><b>Marked for sale</b></button>
                    )
                    :
                    (
                      // if owner is exploring other's land, then owner can request to buy other's land, hence "Request for buy" can be displayed on button.
                      (props.didIRequested) ? 
                      <button className='btn-style'><b>Request Pending</b></button>
                      :
                      <button className='btn-style' onClick={props.requestForBuy}><b>Request for buy</b></button>
                    )
                )
                :
                <button className='btn-style'><b>Not for sale</b></button>
              }

            </div> 
          )
          :
          (
            (props.noResult) ? 
              <div className="  mt-20 mx-auto bg-richblack-600 text-yellow-800 p-2 rounded-md shadow-md text-lg flex items-center justify-center">
                <p className='no-result'>No result found 🚫</p>
              </div>
              :
              <div></div>
          )
    }
    </div>
  )
}

export default DisplayExploreResult