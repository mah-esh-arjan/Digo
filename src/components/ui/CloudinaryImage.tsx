"use client"
import React from 'react'
import { CldImage } from 'next-cloudinary'

type Props = {
  src: string
  width?: number
  height?: number
  alt?: string
  className?: string
}

export default function CloudinaryImage({ src, width = 800, height = 600, alt = '', className = '' }: Props) {
  if (!src) return null
  const isExternal = src.startsWith('http') || src.startsWith('/')
  if (isExternal) {
    return <img src={src} alt={alt} width={width} height={height} className={className} />
  }
  return <CldImage src={src} width={width} height={height} alt={alt} className={className} />
}
