import { MessageOfTheDay } from "@motd-ts/models";
import mongoose, { FilterQuery } from "mongoose";
import { MessageOfTheDayModel } from "../models/messageOfTheDay";
import castObjectId from "../utils/castObjectId";

/**
 * Create a new MOTD in the database.
 *
 * @param message The message text of the new MOTD to create.
 * @returns The newly created MOTD in the database, null if missing a param.
 */
export async function createMotd(message: string): Promise<MessageOfTheDay | null> {
  if (!message) return null;

  return (await MessageOfTheDayModel.create({ message })).toObject({
    versionKey: false,
    flattenObjectIds: true,
  });
}

/**
 * Get the most recently created MOTD.
 *
 * @returns The latest MOTD if there is one, null otherwise.
 */
export async function fetchLatestMotd(): Promise<MessageOfTheDay | null> {
  // Get the newest MOTD. If there is none, EXIT EARLY.
  const motd = await MessageOfTheDayModel.findOne().sort({ createdAt: "descending" });
  if (!motd) return null;

  // Simplify and return the MOTD
  return motd.toObject({ versionKey: false, flattenObjectIds: true });
}

/** Populates the database with a default MOTD if there are no MOTDs present in the database. */
export async function populateDefaultMotds(): Promise<void> {
  // If there is at LEAST one MOTD, we don't need to populate. EXIT EARLY!
  const motd = await fetchLatestMotd();
  if (motd) return;

  // OTHERWISE - populate the database with a default MOTD!
  await createMotd(
    "I know my apprehensions might never be allayed, and so I close, " +
      "realizing that perhaps the ending has not yet been written.",
  );
}

/**
 * Get an existing MOTD.
 *
 * @param id The ID of the MOTD to fetch.
 * @returns The MOTD with the matching id, null if there isn't one.
 */
export async function fetchMotd(
  id: string | mongoose.Types.ObjectId | undefined,
): Promise<MessageOfTheDay | null> {
  const correctedId = castObjectId(id);
  if (!correctedId) return null;

  // Get the existing MOTD. If there is none, EXIT EARLY.
  const motd = await MessageOfTheDayModel.findById(correctedId);
  if (!motd) return null;

  // Simplify and return the MOTD
  return motd.toObject({ versionKey: false, flattenObjectIds: true });
}

/**
 * Update the message text of an existing MOTD.
 *
 * @param id The ID of the MOTD to update.
 * @param newMessage The new message text for the MOTD.
 * @returns The newly updated MOTD if one matched the given id, null if there isn't one.
 */
export async function updateMotd(
  id: string | mongoose.Types.ObjectId | undefined,
  newMessage: string,
): Promise<MessageOfTheDay | null> {
  const correctedId = castObjectId(id);
  if (!correctedId) return null;
  if (!newMessage) return null;

  // Get the existing MOTD. If there is none, EXIT EARLY.
  const motd = await MessageOfTheDayModel.findById(correctedId);
  if (!motd) return null;

  // Update the MOTD
  motd.message = newMessage;
  await motd.save();

  // Simplify and return the updated MOTD
  return motd.toObject({ versionKey: false, flattenObjectIds: true });
}

/**
 * Remove an existing MOTD.
 *
 * @param id The ID of the MOTD to delete.
 * @returns True if a MOTD was found and removed, false otherwise.
 */
export async function removeMotd(
  id: string | mongoose.Types.ObjectId | undefined,
): Promise<boolean> {
  const correctedId = castObjectId(id);
  if (!correctedId) return false;

  // Try to remove the MOTD
  const result = await MessageOfTheDayModel.deleteOne({ _id: correctedId });
  return result.deletedCount > 0;
}

/**
 * Fetch a list of existing MOTDs, sorted in descending order by creation date. Results are
 * paginated.
 *
 * @param args.pageSize The number of items to return per-page. While paginating, this value should
 *   stay the same.
 * @param args.previousLastId OPTIONAL - The value of `lastId` from a previous call. Use this while
 *   paginating to progress through pages of results.
 * @returns A single page of listed results.
 */
export async function listMotds(args: {
  previousLastId?: string | mongoose.Types.ObjectId;
  pageSize: number;
}): Promise<{ lastId?: string; items: MessageOfTheDay[] }> {
  if (args.pageSize <= 0 || Number.isNaN(args.pageSize)) return { items: [] };

  // Create the search query depending on if we have a starting page key
  const searchQuery: FilterQuery<MessageOfTheDay> = {};
  if (args.previousLastId) searchQuery._id = { $lt: args.previousLastId };

  // Search for MOTDs, making sure to search in order and start/stop in a paginated way.
  // We don't sort by createdAt because it's possible for documents to have the same timestamp,
  // which screws up paginating. Instead we rely on ObjectIds property of being ORDERED & unique to
  // determine how to progress a cursor through the DB.
  const foundItems = (
    await MessageOfTheDayModel.find(searchQuery).limit(args.pageSize).sort("-_id")
  ).map((fullItem) => fullItem.toObject({ versionKey: false, flattenObjectIds: true }));

  return {
    lastId: foundItems.length > 0 ? foundItems[foundItems.length - 1]._id : undefined,
    items: foundItems,
  };
}
