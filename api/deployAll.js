const { flameBlocks } = require('../lib/flameData');
const { vaultBlocks } = require('../lib/vaultData');
const { notion } = require('../lib/notionClient');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const parentPageId = process.env.CUBE_PAGE_ID;
  if (!parentPageId) {
    return res.status(500).json({ error: 'CUBE_PAGE_ID not set in environment' });
  }

  const allBlocks = [...flameBlocks, ...vaultBlocks];

  try {
    for (const block of allBlocks) {
      await notion.blocks.children.append({
        block_id: parentPageId,
        children: [block],
      });
    }

    res.status(200).json({ success: true, message: 'Blocks deployed to Notion page.' });
  } catch (error) {
    console.error('Deploy Error:', error);
    res.status(500).json({ error: 'Failed to deploy blocks', detail: error.message });
  }
};
