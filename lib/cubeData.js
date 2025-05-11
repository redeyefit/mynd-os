const CubeSections = {
  FORGE: [
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [
          { type: 'text', text: { content: '🧱 THE FORGE — Structure. Systems. Execution.' } }
        ]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          { type: 'text', text: { content: '→ ZEUS OPS | INFRASTRUCTURE SYSTEMS' } }
        ]
      }
    },
    {
      object: 'block',
      type: 'quote',
      quote: {
        rich_text: [
          { type: 'text', text: { content: '“Here we build what holds the world.”' } }
        ]
      }
    }
  ],

  TEMPLE: [
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [
          { type: 'text', text: { content: '🧬 THE TEMPLE — Vitality. Protocols. Regeneration.' } }
        ]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          { type: 'text', text: { content: '→ HEALTH DIVISION | FIELD LOGS' } }
        ]
      }
    },
    {
      object: 'block',
      type: 'quote',
      quote: {
        rich_text: [
          { type: 'text', text: { content: '“The body is the vessel. The frequency is the medicine.”' } }
        ]
      }
    }
  ],

  FLAME: [
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [
          { type: 'text', text: { content: '🎨 THE FLAME — Expression. Identity. Signal.' } }
        ]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          { type: 'text', text: { content: '→ REDEYE FIT | GYM FREAKS' } }
        ]
      }
    },
    {
      object: 'block',
      type: 'quote',
      quote: {
        rich_text: [
          { type: 'text', text: { content: '“We wear the fire. We lift through myth.”' } }
        ]
      }
    }
  ]

  // Add more sections here (VAULT, TRANSMISSION, etc.)
};

module.exports = { CubeSections };
