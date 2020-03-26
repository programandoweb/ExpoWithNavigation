import React from 'react'
const SoundContext = React.createContext(true)
export const SoundProvider = SoundContext.Provider
export const SoundConsumer = SoundContext.Consumer
export default SoundContext
