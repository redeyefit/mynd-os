
const { Client } = require('@notionhq/client');
const { flameBlocks } = require('../lib/flameData');
const { notion } = require('../lib/notionClient');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const parentPageId = process.env.CUBE_PAGE_ID;

  try {
    for (const block of flameBlocks) {
      await notion.blocks.children.append({
        block_id: parentPageId,
        children: [block]
      });
    }

    res.status(200).json({ status: 'FLAME DEPLOYED' });
  } catch (error) {
    console.error('Deployment error:', error);
    res.status(500).json({ error: error.message });
  }
};
