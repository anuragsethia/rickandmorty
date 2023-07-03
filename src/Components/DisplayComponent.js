import React from 'react'
import { DisplayCard } from './DisplayCard'
import _get from 'lodash/get'

export const DisplayComponent = ({ characterInfo, episodes, locations }) => {

    return (
        <>
            <div className='row row-cols-1 row-cols-md-4 g-4 mx-auto'>
                {characterInfo.map((character, id) => (
                    <DisplayCard
                        key={id}
                        character={character}
                        location={_get(locations, character.origin.name, 'UNKNOWN')}
                        episodes={episodes}
                    />
                ))}
            </div>
        </>
    )
}
