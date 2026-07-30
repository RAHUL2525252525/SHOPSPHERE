import React, { useState } from 'react';
import './ProductDetails.css';

// Swap these for your real product data / API response shape.
const DEFAULT_PRODUCT = {
  category: 'Seating',
  itemNumber: 14,
  catalogTotal: 32,
  name: 'The Wexford Lounge Chair',
  makerLine: 'Built by J. Halloran, Cabinetmaker',
  rating: 4.8,
  reviewCount: 216,
  price: 429,
  originalPrice: 540,
  description:
    "Solid frame with a hand-woven cane back, built by a single joiner from start to finish. The seat softens with use rather than wearing thin — expect it to look better in year three than it did new.",
  specs: [
    { label: 'Material', value: 'Solid wood, cane, wool' },
    { label: 'Dimensions', value: '29"W × 31"D × 34"H' },
    { label: 'Weight', value: '24 lb' },
    { label: 'Warranty', value: '10-year frame' },
  ],
  finishes: [
    { id: 'walnut', label: 'Walnut', swatch: '#6B4A32', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80' },
    { id: 'oak', label: 'Oak', swatch: '#C6A26B', image: 'https://images.unsplash.com/photo-1622957461301-a9baa1cec39b?w=900&q=80' },
    { id: 'ebony', label: 'Ebony', swatch: '#2A2521', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=900&q=80' },
    { id: 'ash', label: 'Ash', swatch: '#DCD3C2', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&q=80' },
  ],
  // top/left position the marker on the photo; cardTop/cardLeft position the popover.
  callouts: [
    { id: 0, top: '22%', left: '46%', cardTop: '16%', cardLeft: '52%', label: 'Joinery', text: 'Mortise-and-tenon frame joints, no fasteners — the same method used for two centuries.' },
    { id: 1, top: '44%', left: '30%', cardTop: '38%', cardLeft: '8%', label: 'Weave', text: 'Cane back hand-woven in a six-way radial pattern, one piece per chair.' },
    { id: 2, top: '68%', left: '62%', cardTop: '62%', cardLeft: '66%', label: 'Upholstery', text: 'Undyed wool blend, chosen to soften and burnish with years of use.' },
  ],
};

export default function ProductDetails({ product = DEFAULT_PRODUCT, loading = false, onAddToCart, onToggleWishlist }) {
  const [activeFinishId, setActiveFinishId] = useState(product.finishes[0]?.id);
  const [openCallout, setOpenCallout] = useState(null);
  const [wishlisted, setWishlisted] = useState(true);

  const activeFinish = product.finishes.find(f => f.id === activeFinishId) || product.finishes[0];
  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleWishlist = () => {
    setWishlisted(w => !w);
    onToggleWishlist?.(!wishlisted);
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="loading">
          <span className="loading-mark">Loading item</span>
          <div className="loading-rule" />
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="catalog-strip">
        <span>Field &amp; Frame Co. — <strong>Catalog Vol. 04</strong></span>
        <span>Item <strong>{String(product.itemNumber).padStart(3, '0')}</strong> of {product.catalogTotal}</span>
      </div>

      <div className="details-container">
        <div className="details-image">
          <div className="main-image-box">
            <img id="mainImage" src={activeFinish.image} alt={product.name} />

            {product.callouts.map(c => (
              <React.Fragment key={c.id}>
                <div
                  className={`callout${openCallout === c.id ? ' open' : ''}`}
                  style={{ top: c.top, left: c.left }}
                  onClick={() => setOpenCallout(openCallout === c.id ? null : c.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={openCallout === c.id}
                  aria-label={`${c.label} detail`}
                >
                  {String(c.id + 1).padStart(2, '0')}
                </div>
                <div
                  className="callout-card"
                  style={{
                    top: c.cardTop,
                    left: c.cardLeft,
                    opacity: openCallout === c.id ? 1 : undefined,
                    pointerEvents: openCallout === c.id ? 'auto' : undefined,
                    transform: openCallout === c.id ? 'translateY(0)' : undefined,
                  }}
                >
                  <span className="cc-label">{c.label}</span>
                  {c.text}
                </div>
              </React.Fragment>
            ))}

            <div className="stamp" aria-hidden="true">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" />
                <circle cx="40" cy="40" r="30" />
                <text className="stamp-core" x="40" y="44">F&amp;F</text>
                <text x="40" y="58" textAnchor="middle">Est. Origin</text>
              </svg>
            </div>
          </div>

          <div className="image-caption">
            <span className="cap-main">Shown in {activeFinish.label.toLowerCase()}, natural finish</span>
            <span>{product.finishes.findIndex(f => f.id === activeFinishId) + 1} / {product.finishes.length}</span>
          </div>

          <div className="thumbnail-row">
            {product.finishes.map(f => (
              <img
                key={f.id}
                className={`thumb${f.id === activeFinishId ? ' active' : ''}`}
                src={f.image.replace('w=900', 'w=200')}
                alt={f.label}
                onClick={() => setActiveFinishId(f.id)}
              />
            ))}
          </div>
        </div>

        <div className="details-info">
          <div className="details-eyebrow reveal-up r1">
            <span className="details-category">{product.category}</span>
            <span className="divider" />
            <span className="stock">In stock — ships in 3 days</span>
          </div>

          <h1 className="reveal-up r2">{product.name}</h1>
          <p className="maker-line reveal-up r2">{product.makerLine}</p>

          <div className="details-rating reveal-up r3">
            <span className="stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span className="rating-number">{product.rating}</span>
            <span className="rating-count">— {product.reviewCount} reviews</span>
          </div>

          <div className="details-price reveal-up r3">
            <span className="current">${product.price}</span>
            {product.originalPrice && <del>${product.originalPrice}</del>}
            {discountPct > 0 && <span className="details-discount-badge">SAVE {discountPct}%</span>}
          </div>

          <p className="description reveal-up r4">{product.description}</p>

          <div className="finish-select reveal-up r4">
            <span className="fs-label">Finish — <span className="fs-current">{activeFinish.label}</span></span>
            <div className="swatches">
              {product.finishes.map(f => (
                <div
                  key={f.id}
                  className={`swatch${f.id === activeFinishId ? ' active' : ''}`}
                  style={{ background: f.swatch }}
                  title={f.label}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${f.label} finish`}
                  onClick={() => setActiveFinishId(f.id)}
                />
              ))}
            </div>
          </div>

          <div className="detail-specs reveal-up r5">
            {product.specs.map(s => (
              <div key={s.label}>
                <span className="spec-label">{s.label}</span>
                <span className="spec-value">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="details-buttons reveal-up r6">
            <button onClick={() => onAddToCart?.({ ...product, finish: activeFinish.id })}>
              Add to Cart
            </button>
            <button
              className={`wishlist${wishlisted ? ' active' : ''}`}
              aria-label="Wishlist"
              onClick={handleWishlist}
            >
              <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
