import { exiftool } from "exiftool-vendored";
import { stat } from "node:fs/promises";
import path from "node:path";

const SUPPORTED_EXTENSIONS = new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif",
    ".tif",
    ".tiff",
    ".heic",
    ".heif",
]);

const files = process.argv.slice(2);

const isSupportedImage = (filePath) =>
    SUPPORTED_EXTENSIONS.has(path.extname(filePath).toLowerCase());

const isRealFile = async (filePath) => {
    try {
        const fileStats = await stat(filePath);
        return fileStats.isFile();
    } catch {
        return false;
    }
};

const sanitizeFile = async (filePath) => {
    await exiftool.write(filePath, {}, ["-all=", "-overwrite_original"]);
};

const main = async () => {
    const imageFiles = [];

    for (const file of files) {
        if (!isSupportedImage(file)) {
            continue;
        }

        if (await isRealFile(file)) {
            imageFiles.push(file);
        }
    }

    if (imageFiles.length === 0) {
        await exiftool.end();
        return;
    }

    const failedFiles = [];

    for (const file of imageFiles) {
        try {
            await sanitizeFile(file);
            console.log(`metadata stripped: ${file}`);
        } catch (error) {
            failedFiles.push(file);
            console.error(`failed to strip metadata: ${file}`);
            console.error(error);
        }
    }

    await exiftool.end();

    if (failedFiles.length > 0) {
        process.exitCode = 1;
    }
};

await main();
