'use client'

import { Deck } from '@/engine/components/Deck'
import { SECTIONS } from '@/deck/content/sections'
import { SLIDES } from '@/deck/slides'

export default function Presentation() {
  return <Deck slides={SLIDES} sections={SECTIONS} />
}
