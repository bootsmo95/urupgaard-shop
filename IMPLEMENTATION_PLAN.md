# Urupgaard Shop - Implementation Plan

Status: IN PROGRESS (20 Apr 2026)

## 🎯 10 Feature Tasks

### 1. 🔍 Search & Filter
- **Description**: Add search functionality + tag/category filters on `/shop`
- **Files to create/modify**:
  - `components/ProductSearch.vue` - Search input + filters
  - `server/api/products/search.ts` - Search endpoint (GET)
  - `pages/shop/index.vue` - Integrate search
- **Dependencies**: None
- **Priority**: HIGH
- **Status**: TODO

### 2. ⭐ Product Reviews
- **Description**: Rating system + user reviews on product detail pages
- **Files to create/modify**:
  - `server/api/reviews.ts` - Submit & fetch reviews (POST/GET)
  - `components/ProductReviews.vue` - Display reviews
  - `pages/shop/[collection]/[handle].vue` - Integrate reviews
- **Dependencies**: None (or optional: Auth for verified buyers)
- **Priority**: MEDIUM
- **Status**: TODO

### 3. 📧 Newsletter Signup
- **Description**: Email capture form in footer + subscribe endpoint
- **Files to create/modify**:
  - `components/NewsletterSignup.vue` - Form component
  - `server/api/newsletter.ts` - Save email (POST)
  - `components/SiteFooter.vue` - Add form to footer
- **Dependencies**: Email service (SendGrid, Mailgun, or local DB)
- **Priority**: MEDIUM
- **Status**: TODO

### 4. 📬 Contact Form
- **Description**: Dedicated contact page + form submission
- **Files to create/modify**:
  - `pages/contact.vue` - Contact page
  - `server/api/contact.ts` - Form submission handler (POST)
  - `components/ContactForm.vue` - Form component
- **Dependencies**: Email service
- **Priority**: HIGH
- **Status**: TODO

### 5. 🖼️ Product Image Gallery
- **Description**: Multiple product images with lightbox/carousel
- **Files to create/modify**:
  - `components/ProductGallery.vue` - Image carousel + lightbox
  - `pages/shop/[collection]/[handle].vue` - Integrate gallery
  - Update GraphQL query to fetch more images
- **Dependencies**: None (or lightbox library)
- **Priority**: HIGH
- **Status**: TODO

### 6. 🔗 Related Products
- **Description**: "See also" section on product detail pages
- **Files to create/modify**:
  - `components/RelatedProducts.vue` - Display related items
  - `server/api/products/related.ts` - Find similar products (GET with query)
  - `pages/shop/[collection]/[handle].vue` - Integrate section
- **Dependencies**: Search/tagging system (Task 1)
- **Priority**: MEDIUM
- **Status**: TODO

### 7. 📦 Stock/Availability
- **Description**: Show stock status, "out of stock" badges, pre-order
- **Files to create/modify**:
  - Update GraphQL queries to fetch inventory
  - `components/StockStatus.vue` - Availability indicator
  - `pages/shop/[collection]/[handle].vue` - Show status
  - `pages/shop/[collection]/index.vue` - Badge on grid
- **Dependencies**: None
- **Priority**: HIGH
- **Status**: TODO

### 8. 📊 Analytics/Tracking
- **Description**: Google Analytics or Plausible integration
- **Files to create/modify**:
  - `nuxt.config.ts` - Add analytics module
  - Optional: `server/middleware/tracking.ts` - Custom event tracking (GET/POST)
- **Dependencies**: Analytics service account
- **Priority**: MEDIUM
- **Status**: TODO

### 9. 🔎 SEO Optimization
- **Description**: Meta tags, structured data (JSON-LD), sitemap, robots.txt
- **Files to create/modify**:
  - `nuxt.config.ts` - Configure SEO module
  - `composables/useSEO.ts` - SEO helper composable
  - `pages/shop/[collection]/[handle].vue` - Dynamic meta tags
  - `public/sitemap.xml` - Generate sitemap
  - Update `robots.txt`
- **Dependencies**: None
- **Priority**: HIGH
- **Status**: TODO

### 10. 📸 Instagram Feed Integration
- **Description**: Display Instagram posts on homepage
- **Files to create/modify**:
  - `components/InstagramFeed.vue` - Grid of posts
  - `server/api/instagram.ts` - Fetch from Instagram API (GET)
  - `pages/index.vue` - Add section to homepage
- **Dependencies**: Instagram Graph API credentials
- **Priority**: LOW
- **Status**: TODO

---

## 📋 Task Assignment

| Task | Agent | Estimated Time | Status |
|------|-------|-----------------|--------|
| 1. Search & Filter | subagent-1 | 2-3h | TODO |
| 2. Product Reviews | subagent-2 | 3-4h | TODO |
| 3. Newsletter Signup | subagent-3 | 1-2h | TODO |
| 4. Contact Form | subagent-4 | 2-3h | TODO |
| 5. Image Gallery | subagent-5 | 2-3h | TODO |
| 6. Related Products | subagent-6 | 2h | TODO |
| 7. Stock Status | subagent-7 | 2h | TODO |
| 8. Analytics | subagent-8 | 1-2h | TODO |
| 9. SEO Optimization | subagent-9 | 2-3h | TODO |
| 10. Instagram Feed | subagent-10 | 1-2h | TODO |

---

## 🚀 Execution Strategy

1. **Parallel work**: Agents work simultaneously on independent tasks
2. **Integration points**: Some tasks may depend on others (noted in dependencies)
3. **Code review**: Each agent commits to a feature branch
4. **Testing**: Each feature includes basic testing
5. **Final merge**: All branches merged to main after validation

---

## 📝 Notes for Agents

- Reuse existing patterns (API endpoints, component structure)
- Follow the current styling system (Tailwind + stone color palette)
- Keep responsive design in mind
- Add proper error handling
- Document any new API endpoints
- Commit with descriptive messages: `feat(feature-name): description`

---

Last updated: 20 Apr 2026
