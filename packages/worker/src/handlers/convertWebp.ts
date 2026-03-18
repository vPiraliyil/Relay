/**
 * Handler: convert_webp
 * Converts the input image to WebP format.
 * Output is written to a deterministic temp path derived from jobId, then renamed atomically.
 */
export async function convertWebp(imageUrl: string, outputDir: string, jobId: string): Promise<void> {
  // TODO: sharp(imageUrl).webp().toFile(tempPath), then rename to final path
}
