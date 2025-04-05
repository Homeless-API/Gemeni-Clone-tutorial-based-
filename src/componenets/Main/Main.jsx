import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Contex } from '../../contex/Contex'

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Contex)

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini Clone</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

        {!showResult
        ? <>
                      <div className="greet">
                          <p><span>Hi, I'm Gemini</span></p>
                          <p>How Can i assit you, user?</p>
                      </div>
                      <div className="cards">
                          <div className="card">
                              <p>A city where everyone wears masks by choice, and one mask reveals their true selves.</p>
                              <img src={assets.compass_icon} alt="" />
                          </div>
                          <div className="card">
                              <p>Build a React app that fetches synonyms for a typed word using Tailwind for styling.</p>
                              <img src={assets.bulb_icon} alt="" />
                          </div>
                          <div className="card">
                              <p>Design a boss that attacks using soundwaves the player must dodge with rhythm.</p>
                              <img src={assets.message_icon} alt="" />
                          </div>
                          <div className="card">
                              <p>A blacksmith loses a memory every time they forge a powerful weapon.</p>
                              <img src={assets.code_icon} alt="" />
                          </div>
                      </div>
                      </>:
                      <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                      <div className="result-data">
                          <img src={assets.gemini_icon} alt="" />
                          {loading ? (
                              <div className='loader'>
                                  <hr />
                                  <hr />
                                  <hr />
                              </div>
                          ) : resultData ? (
                              <p dangerouslySetInnerHTML={{ __html: resultData }} />
                          ) : (
                              <p className="error-message">The result has failed. Please try again later.</p>
                          )}
                      </div>

                      </div>
                      }

        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter your command'/>
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                </div>
            </div>
            <p className="bottom-info">
                      ⚠️ This content may not always be accurate or up-to-date. Please verify information from trusted sources before making decisions based on it.
            </p>
        </div>
      </div>
    </div>
  )
}

export default Main
