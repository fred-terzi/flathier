import crypto from 'crypto';
import getCustomExt from './getCustomExt.js';

/**
 * Generates a unique ID based on the current date-time and a random hex string.
 * @returns {string} A unique ID.
 */
export default async function generateUniqueId() {
    const currentDateTime = new Date().toISOString();
    let customExt;
    try {
        customExt = await getCustomExt();
    } catch {
        customExt = 'reqt';
    }
    return `${currentDateTime}-${crypto.randomBytes(4).toString('hex')}-${customExt}`;
}