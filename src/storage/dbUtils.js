// dbUtils.js
import db from "./db";

// ✅ Insert a single menu item
export async function insertMenuItem(item) {
  await db.runAsync(
    "INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)",
    [item.name, item.price, item.description, item.image, item.category]
  );
}

// ✅ Bulk insert (useful for API response)
export async function insertMenuItems(items) {
  for (const item of items) {
    await insertMenuItem(item);
  }
}

// ✅ Fetch all menu items
export async function getMenuData() {
  const result = await db.getAllAsync("SELECT * FROM menu");
  return result; // array of rows
}

// ✅ Fetch few menu items
export async function getSelectedData(item) {
  const result = await db.getAllAsync("SELECT * FROM menu where category = ?",
    [item]
  );
  return result; // array of rows
}

// ✅ Clear menu table (for debugging / refresh)
export async function clearMenu() {
  await db.runAsync("DELETE FROM menu");
}
