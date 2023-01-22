import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface HabitDayProps {
    date: Date
    defaultCompleted?: number
    amount?: number
}

export function HabitDay({defaultCompleted = 0, amount = 0, date}:HabitDayProps){
    const [completed, setCompleted]= useState(defaultCompleted)
    const completePercentage = amount! > 0 ? Math.round((completed! / amount!) * 100) : 0
    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

    function handleCompletedChanged (completed:number){
        setCompleted(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger className= {clsx("w-10 h-10 rounded-lg transition-colors",{
                'bg-zinc-900  border-zinc-800'   : completePercentage === 0,
                'bg-violet-300 border-violet-400': completePercentage >   0 && completePercentage < 20,
                'bg-violet-400 border-violet-400': completePercentage >= 20 && completePercentage < 40,
                'bg-violet-500 border-violet-400': completePercentage >= 40 && completePercentage < 60,
                'bg-violet-600 border-violet-400': completePercentage >= 60 && completePercentage < 80,
                'bg-violet-700 border-violet-400': completePercentage >= 80,
                
            })} />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                <span className='font semi-bold text-zinc-400'>{dayOfWeek}</span>
                <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
                <ProgressBar progress={completePercentage}></ProgressBar>
                <HabitsList date = {date} onCompletedChanged = {handleCompletedChanged}/>
                <Popover.Arrow className='fill-zinc-800 ' height={8} width={16} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}