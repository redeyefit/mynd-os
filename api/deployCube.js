const { Client } = require('@notionhq/client');
const { cubeBlocks } = require('../lib/cubeData');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const parentPageId = process.env.CUBE_PAGE_ID;

  try {
    for (const block of cubeBlocks) {
      try {
        await notion.blocks.children.append({
          block_id: parentPageId,
          children: [block]
        });
      } catch (blockError) {
        console.error('🔥 Failed block:', JSON.stringify(block, null, 2));
        throw new Error(`Block failed: ${blockError.message}`);
      }
    }

    res.status(200).json({
      success: true,
      message: '🧊 THE CUBE deployed successfully to Notion.'
    });
  } catch (err) {
    console.error('💥 Deployment error:', err.message);
    res.status(500).json({
      error: 'Deploy failed on block',
      detail: err.message
    });
  }
};
