function hasTag(card, tag) {
  return (card.tags || []).includes(tag);
}

module.exports = { hasTag };
