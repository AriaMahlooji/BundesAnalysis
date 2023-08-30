import React from 'react'
import Match from './Match'
import {AiOutlineCaretRight, AiOutlineCaretLeft} from 'react-icons/ai'

const MatchList = ({matches}) => {
  return (
    <div className="rounded-lg p-2 bg-white space-y-2 flex flex-col">
        <h2 className='flex justify-center'>Matches</h2>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-center'><AiOutlineCaretLeft/>Pevious</div>
            <div className='flex items-center justify-center'>Next<AiOutlineCaretRight/></div>
        </div>
        <ul className='space-y-2'>
            {matches.map((match)=>(
                <li><Match match={match}></Match></li>
            ))}
        </ul>
    </div>
  )
}

export default MatchList