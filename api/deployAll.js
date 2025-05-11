const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });







module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const parentPageId = process.env.CUBE_PAGE_ID;

  try {
    await notion.blocks.children.append({
      block_id: parentPageId,
      children: [
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '✅ Test block — rich_text works!'
                }
              }
            ]
          }
        }
      ]
    });

    res.status(200).json({ success: true, message: 'Test block deployed.' });
  } catch (error) {
    console.error('Deploy Error:', error);
    res.status(500).json({ error: 'Failed to deploy test block', detail: error.message });
  }
};
