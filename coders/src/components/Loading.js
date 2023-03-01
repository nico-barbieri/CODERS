import loadingAnimation from '../res/lottie/loading.json'
import Lottie from 'lottie-react'

const Loading = () => {loadingAnimation
    return <div className="loading-screen">
        <div className='loading-wrapper'>
        <Lottie className='loading-animation' animationData={loadingAnimation}/>
        </div>
    </div>
}

export default Loading;