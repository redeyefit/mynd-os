
const { vaultBlocks } = require('../lib/vaultData');
const { notion } = require('../lib/notionClient');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const parentPageId = process.env.CUBE_PAGE_ID;

  try {
    for (const block of vaultBlocks) {
      await notion.blocks.children.append({
        block_id: parentPageId,
        children: [block]
      });
    }

    res.status(200).json({ status: 'VAULT DEPLOYED' });
  } catch (error) {
    console.error('Deployment error:', error);
    res.status(500).json({ error: error.message });
  }
};
