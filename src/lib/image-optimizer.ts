import sharp from 'sharp'

export interface OptimizeOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'jpeg' | 'png' | 'webp'
}

const DEFAULT_OPTIONS: OptimizeOptions = {
  maxWidth: 2048,
  maxHeight: 2048,
  quality: 80,
  format: 'webp',
}

export async function optimizeImage(buffer: Buffer, options?: OptimizeOptions): Promise<Buffer> {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  let pipeline = sharp(buffer)

  const metadata = await pipeline.metadata()

  // Resize if larger than max dimensions
  if (metadata.width && metadata.width > (opts.maxWidth || 2048)) {
    pipeline = pipeline.resize({
      width: opts.maxWidth,
      height: opts.maxHeight,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  // Convert to chosen format
  switch (opts.format) {
    case 'jpeg':
      pipeline = pipeline.jpeg({ quality: opts.quality, progressive: true, mozjpeg: true })
      break
    case 'png':
      pipeline = pipeline.png({ quality: opts.quality })
      break
    case 'webp':
    default:
      pipeline = pipeline.webp({ quality: opts.quality })
      break
  }

  return pipeline.toBuffer() as unknown as Buffer
}

export async function getImageMetadata(buffer: Buffer): Promise<sharp.Metadata> {
  return sharp(buffer).metadata()
}
