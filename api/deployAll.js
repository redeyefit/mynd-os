const { flameBlocks } = require('../lib/flameData');
const { vaultBlocks } = require('../lib/vaultData');
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const parentPageId = process.env.CUBE_PAGE_ID;
  const allBlocks = [...flameBlocks, ...vaultBlocks];

  try {
    for (const block of allBlocks) {
      await notion.blocks.children.append({
        block_id: parentPageId,
        children: [block],
      });
    }

    res.status(200).json({ success: true, message: '🔥 Flame + Vault deployed to Notion.' });
  } catch (err) {
    console.error('💥 Block Error:', err.message);
    res.status(500).json({ error: 'Deploy failed', detail: err.message });
  }
};
