
const { flameBlocks } = require('../lib/flameData');
const { vaultBlocks } = require('../lib/vaultData');
const { notion } = require('../lib/notionClient');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const parentPageId = process.env.CUBE_PAGE_ID;

  try {
    const allBlocks = [
      ...flameBlocks,
      ...vaultBlocks
      // Future: ...forgeBlocks, ...templeBlocks, etc.
    ];

    for (const block of allBlocks) {
      await notion.blocks.children.append({
        block_id: parentPageId,
        children: [block]
      });
    }

    // Optional log entry
    await notion.blocks.children.append({
      block_id: parentPageId,
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            text: [
              {
                type: 'text',
                text: {
                  content: `🕰 MYND-OS DEPLOYED: ${new Date().toLocaleString()}`
                }
              }
            ]
          }
        }
      ]
    });

    res.status(200).json({ status: 'ALL MODULES DEPLOYED' });
  } catch (error) {
    console.error('Deployment error:', error);
    res.status(500).json({ error: error.message });
  }
};
