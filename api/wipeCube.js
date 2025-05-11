const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function wipeNotionPageChildren(parentPageId) {
  const existing = await notion.blocks.children.list({ block_id: parentPageId });
  for (const child of existing.results) {
    try {
      await notion.blocks.delete({ block_id: child.id });
    } catch (err) {
      console.warn('⚠️ Could not delete block:', child.id, err.message);
    }
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const parentPageId = process.env.CUBE_PAGE_ID;

  try {
    await wipeNotionPageChildren(parentPageId);

    res.status(200).json({
      success: true,
      message: '🧼 Notion page children wiped successfully.'
    });
  } catch (err) {
    console.error('💥 WipeCube error:', err);
    res.status(500).json({
      error: 'Failed to wipe page',
      detail: err.message
    });
  }
};

module.exports.wipeNotionPageChildren = wipeNotionPageChildren;

