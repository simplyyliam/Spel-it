import React from 'react'
import { UIButton } from './ButtonModal'
import { Pause } from 'lucide-react'

function PauseButton() {
  return (
    <UIButton className="p-3">
        <Pause className='stroke-1'/>
    </UIButton>
  )
}

export default PauseButton