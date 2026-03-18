/**
 * Handler: strip_exif
 * Removes all EXIF metadata from the input image.
 * Output is written to a deterministic temp path derived from jobId, then renamed atomically.
 */
export async function stripExif(imageUrl: string, outputDir: string, jobId: string): Promise<void> {
  // TODO: sharp(imageUrl).withMetadata({}).toFile(tempPath), then rename to final path
}
