# Shellz Mobile Navigation Fix — 2026-06-19

This update fixes the mobile homepage issue where the navigation appeared as a large blank white card and pushed over the hero.

Changes made:
- Mobile header uses logo-left / hamburger-right layout.
- Main navigation is hidden on mobile until the hamburger is tapped.
- Open mobile menu is a compact vertical list, not a tall blank panel.
- Menu always starts closed on page load.
- Clicking outside, pressing Escape, selecting a menu link, or resizing to desktop closes the menu.
- Homepage mobile hero heading and lead text were scaled down for better above-the-fold layout.
- CSS and JS cache-busting query strings were updated across HTML files.
