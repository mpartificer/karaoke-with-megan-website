import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      image_url,
      username,
      user_email,
      file_type,
      file_size,
      cloudinary_public_id,
    } = req.body;

    // Basic validation
    if (!image_url || !username || !user_email || !cloudinary_public_id) {
      return res.status(400).json({
        error:
          "Missing required fields: image_url, username, user_email, cloudinary_public_id",
      });
    }

    // Insert into database
    const query = `
      INSERT INTO karaoke_image_data 
      (image_url, username, user_email, file_type, file_size, cloudinary_public_id, upload_date)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id
    `;

    const values = [
      image_url,
      username,
      user_email,
      file_type || "unknown",
      file_size || 0,
      cloudinary_public_id,
    ];

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      id: result.rows[0].id,
      message: "Upload logged successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Failed to log upload to database",
      details: error.message,
    });
  }
}
