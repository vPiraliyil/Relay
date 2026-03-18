/**
 * Handler: resize_medium
 * Resizes the input image to 800px wide, maintaining aspect ratio.
 * Output is written to a deterministic temp path derived from jobId, then renamed atomically.
 */
export async function resizeMedium(imageUrl: string, outputDir: string, jobId: string): Promise<void> {
  // TODO: sharp(imageUrl).resize(800).toFile(tempPath), then rename to final path
}
