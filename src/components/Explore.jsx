import React, { useEffect, useState } from 'react'
import '../css/Explore.css'
import DisplayExploreResult from './DisplayExploreResult';

const Explore = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  console.log(account);

  const [explore, setExplore] = useState({
    state:"", district:"", city:"", surveyNo:""
  })

  const [landDetail, setLandDetail] = useState({
    owner:"", propertyId:"", index:"", marketValue:"", sqft:""
  })

  const [didIRequested, setDidIRequested] = useState(false);
  const [available, setAvailable] = useState(false);
  const [noResult, setNoResult] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setExplore({...explore, [name]:value})
  }

  const handleOnClick = async () =>{
    console.log(account);
    const landDetails = await contract.getLandDetails(explore.state, explore.district, explore.city, explore.surveyNo, {
      from: account
    })

    const isAvaliable = await contract.isAvailable(explore.state, explore.district, explore.city, explore.surveyNo, {
      from: account
    })

    const owner = landDetails[0];
    const propertyId = landDetails[1].words[0]
    const index = landDetails[2].words[0]
    const marketValue = landDetails[3].words[0]
    const sqft = landDetails[4].words[0]
    const surveyNo = explore.surveyNo

    if(account === owner){
      setIsOwner(true)
    }
    else{
      setIsOwner(false);
      if(isAvaliable){
        const _didIRequested = await contract.didIRequested(explore.state, explore.district, explore.city, explore.surveyNo,{
          from: account
        })
        
        setDidIRequested(_didIRequested);
      }
    }

    setLandDetail({owner, propertyId, index, marketValue, sqft, surveyNo})
    setAvailable(isAvaliable);
    setNoResult(1);
  }

  const requestForBuy = async () =>{
    await contract.RequestForBuy(explore.state, explore.district, explore.city, explore.surveyNo, {
      from: account
    })

    setDidIRequested(true);
  }


  useEffect(()=>{
    console.log(landDetail)
  }, [landDetail])

  
  return (
    <div className=' w-8/12  p-8 rounded-md mx-auto mt-7 text-richblack-25 bg-richblack-800'>
        <div className='mx-auto'>
            <form method='POST' className='mx-auto'>
              <div className='form-group'>
                  <label className='lable-style'>State</label>
                  <input type="text" className="form-style" name="state" placeholder="Enter State" 
                  autoComplete="off" value={explore.state} onChange={onChangeFunc}/>
              </div>
              <div className='form-group'>
                  <label className='lable-style'>District</label>
                  <input type="text" className="form-style"  name="district" placeholder="Enter district" 
                  autoComplete="off" value={explore.district} onChange={onChangeFunc}/>
              </div>
              <div className='form-group'>
                  <label className='lable-style'>City</label>
                  <input type="text" className="form-style"  name="city" placeholder="Enter city" 
                  autoComplete="off" value={explore.city} onChange={onChangeFunc}/>
              </div>
              <div className='form-group'>
                  <label className='lable-style'>Survey number</label>
                  <input type="text" className="form-style"  name="surveyNo" placeholder="Enter survey number" 
                  autoComplete="off" value={explore.surveyNo} onChange={onChangeFunc}/>
              </div>

              </form>
        </div>
        <button className='btn-style mx-auto mt-8' onClick={handleOnClick}>Explore</button>

        <DisplayExploreResult

            owner = {landDetail.owner}
            propertyId = {landDetail.propertyId}
            surveyNo = {landDetail.surveyNo}
            marketValue = {landDetail.marketValue}
            sqft = {landDetail.sqft}
            available = {available}
            isAdmin = {props.isAdmin}
            didIRequested = {didIRequested}
            requestForBuy = {requestForBuy}
            noResult = {noResult}
            isOwner = {isOwner}

        />
        
    </div>
  )
}

export default Explore