const { Client } = require('@notionhq/client');
const { cubeBlocks } = require('../lib/cubeData');
const { wipeNotionPageChildren } = require('./wipeCube');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const parentPageId = process.env.CUBE_PAGE_ID;

  try {
    // Step 1: Wipe existing children using shared logic
    await wipeNotionPageChildren(parentPageId);

    // Step 2: Append clean new Cube blocks
    for (const block of cubeBlocks) {
      await notion.blocks.children.append({
        block_id: parentPageId,
        children: [block]
      });
    }

    res.status(200).json({
      success: true,
      message: '🧊 THE CUBE deployed dynamically with wipe-first logic.'
    });
  } catch (err) {
    console.error('💥 DeployCube error:', err);
    res.status(500).json({
      error: 'Deploy failed',
      detail: err.message
    });
  }
};
