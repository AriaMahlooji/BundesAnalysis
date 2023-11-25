import React from 'react';
import {Chart} from '../components/Chart';
import Criterias from './Criterias';

const Analyzer = () => {
  return (
    //Criterias and chart
    <div className='flex flex-col p-2'>
        <div className='flex justify-between'>
            <Criterias></Criterias>
        </div>
        <div className='flex items-center justify-center'>
            <Chart></Chart>
        </div>
    </div>
  )
}

export default Analyzer