/**
 * Handler: resize_thumbnail
 * Resizes the input image to 150x150.
 * Output is written to a deterministic temp path derived from jobId, then renamed atomically.
 */
export async function resizeThumbnail(imageUrl: string, outputDir: string, jobId: string): Promise<void> {
  // TODO: sharp(imageUrl).resize(150, 150).toFile(tempPath), then rename to final path
}
