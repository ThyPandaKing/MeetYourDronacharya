import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const { height, width } = useWindowDimensions();
  let history = useHistory();
  return (
    <div>
      <div>
      <button onClick= {() =>history.push('/ask-something')} style={{backgroundColor:"#e91e63", width: "350px", height:"75px",fontSize:20,color:'white',borderRadius:15,marginRight:width-700,marginTop:height-500}}>Ask something</button>
      <button onClick= {() =>history.push('/experience')} style={{backgroundColor:"#212121", width: "350px", height:"75px",fontSize:20,color:'white',borderRadius:15}}>Experience</button>
      </div>
      <div>
      <button onClick= {() =>history.push('/study-material')} style={{backgroundColor:"#32064A", width: "400px", height:"75px",fontSize:20,color:'white', marginRight:width-800,borderRadius:15}}>Study material</button>
      <button onClick= {() =>history.push('/timeline')} style={{backgroundColor:"#424242", width: "400px", height:"75px",fontSize:20,color:'white',borderRadius:15}}>Timeline</button>
      </div>
      <div>
      <button onClick= {() =>history.push('/dashboard')} style={{backgroundColor:'green', width: "450px", height:"75px",fontSize:20,marginRight:width-900,borderRadius:15}}>Dashboard</button>
      <button onClick= {() =>history.push('/find-myself')} style={{backgroundColor:"#616161", width: "450px", height:"75px",fontSize:20,borderRadius:15}}>Find your passion</button>
      </div>
      <div>
      <button onClick= {() =>history.push('/about-us')} style={{backgroundColor:'yellow', width: "500px", height:"75px",fontSize:20,marginBottom:100,borderRadius:15,marginRight:width-1000}}>About us</button>
      <button onClick= {() =>history.push('/')} style={{backgroundColor:"#757575", width: "500px", height:"75px",fontSize:20,borderRadius:15}}>Extra</button>
      </div>
    </div>
  );
};


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


export default Home;
