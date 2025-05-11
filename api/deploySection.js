const { Client } = require('@notionhq/client');
const { CubeSections } = require('../lib/cubeData');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  const sectionKey = req.query.section?.toUpperCase();
  const blocks = CubeSections[sectionKey];

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!blocks) {
    return res.status(400).json({ error: 'Invalid or missing section key' });
  }

  const parentPageId = process.env.CUBE_PAGE_ID;

  try {
    for (const block of blocks) {
      await notion.blocks.children.append({
        block_id: parentPageId,
        children: [block]
      });
    }

    res.status(200).json({
      success: true,
      section: sectionKey,
      message: `✅ ${sectionKey} section deployed to Notion.`
    });
  } catch (err) {
    console.error('💥 DeploySection error:', err);
    res.status(500).json({
      error: 'Deploy failed',
      detail: err.message
    });
  }
};
