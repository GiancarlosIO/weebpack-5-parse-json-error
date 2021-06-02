import React from 'react';

import { Picker } from 'emoji-mart';

import EmojiStyles from './styles'

const App = props => {
  return (
    <div>
      <EmojiStyles />
      <Picker
        color={primaryLighter}
        set="twitter"
        theme="dark"
        onSelect={onSelect}
        title="Encuentra tu emoji"
        emoji="crehana"
        sheetSize={32}
        include={[
          'recent',
          'search',
          'custom',
          'smileys',
          'people',
          'nature',
          'foods',
          'activity',
          'places',
          'objects',
          'symbols',
          'flags',
        ]}
        i18n={{
          search: 'Buscar',
          // skintext: 'Choose your default skin tone',
          notfound: 'Emoji no encontrado',
          categories: {
            search: 'Resultados de búsqueda',
            recent: 'Usados frecuentemente',
            smileys: 'Smileys & Emotion',
            people: 'People & Body',
            nature: 'Animals & Nature',
            foods: 'Food & Drink',
            activity: 'Activity',
            places: 'Travel & Places',
            objects: 'Objects',
            symbols: 'Symbols',
            flags: 'Flags',
            custom: 'Crehana',
          },
        }}
        skin={1}
        defaultSkin={1}
        autoFocus
        enableFrequentEmojiSort
        showPreview={false}
      />
    </div>
  )
}

export default App

