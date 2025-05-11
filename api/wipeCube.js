const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const parentPageId = process.env.CUBE_PAGE_ID;

  try {
    // Fetch all child blocks
    const response = await notion.blocks.children.list({
      block_id: parentPageId,
      page_size: 100,
    });

    const children = response.results;

    // Delete each block individually
    for (const block of children) {
      try {
        await notion.blocks.delete({ block_id: block.id });
      } catch (err) {
        console.error(`❌ Failed to delete block ${block.id}:`, err.message);
      }
    }

    res.status(200).json({
      success: true,
      message: `🧹 Wiped ${children.length} block(s) from the Cube.`,
    });
  } catch (err) {
    console.error('💥 Error during wipe:', err.message);
    res.status(500).json({
      error: 'Failed to wipe cube',
      detail: err.message,
    });
  }
};
