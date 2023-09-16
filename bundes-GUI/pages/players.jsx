import PlayersEdit from '@/components/PlayersEdit'
import TeamsEdit from '@/components/TeamsEdit'
import React from 'react'

const players = () => {
  return (
    <div className='flex '>
      <div className='w-1/2 '><PlayersEdit></PlayersEdit></div>
      <div className='w-1/2  '><TeamsEdit></TeamsEdit></div>
    </div>
  )
}

export default players