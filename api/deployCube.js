const { Client } = require('@notionhq/client');
const { cubeBlocks } = require('../lib/cubeData');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const parentPageId = process.env.CUBE_PAGE_ID;

  try {
    const previewBlock = cubeBlocks[0];

    // DEBUG: Echo the first block to verify structure
    console.log('🧪 First Block:', JSON.stringify(previewBlock, null, 2));

    const response = await notion.blocks.children.append({
      block_id: parentPageId,
      children: [previewBlock] // test only one block
    });

    res.status(200).json({
      success: true,
      message: '✅ First Cube block deployed successfully.',
      block: previewBlock
    });
  } catch (err) {
    console.error('💥 DeployCube Error:', err.message);
    res.status(500).json({
      error: 'Failed to deploy blocks',
      detail: err.message,
      failedBlock: cubeBlocks[0]
    });
  }
};
